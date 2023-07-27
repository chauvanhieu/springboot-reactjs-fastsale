package com.venus.service;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.venus.entities.User;
import com.venus.repository.UserRepository;

@Service
public class JwtService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private HttpServletRequest request;

	@SuppressWarnings("unused")
	@Autowired
	private HttpServletResponse response;

	private final static String USERNAME = "email";
	private final static String TOKEN_HEADER = "Authorization";
	private static final String SECRET_KEY = "a1h2ou38124oiuqwker8012jqwjed9812qwemj1absdoasd";
	private static final int EXPIRE_TIME = 86400000;

	public String generateTokenLogin(String username) {
		String token = null;
		try {
			JWSSigner signer = new MACSigner(generateShareSecret());
			JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
			builder.claim(USERNAME, username);
			builder.expirationTime(generateExpirationDate());
			JWTClaimsSet claimsSet = builder.build();
			SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
			signedJWT.sign(signer);
			token = signedJWT.serialize();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return token;
	}

	private JWTClaimsSet getClaimsFromToken(String token) {
		JWTClaimsSet claims = null;
		try {
			SignedJWT signedJWT = SignedJWT.parse(token);
			JWSVerifier verifier = new MACVerifier(generateShareSecret());
			if (signedJWT.verify(verifier)) {
				claims = signedJWT.getJWTClaimsSet();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return claims;
	}

	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + EXPIRE_TIME);
	}

	private Date getExpirationDateFromToken(String token) {
		Date expiration = null;
		JWTClaimsSet claims = getClaimsFromToken(token);
		expiration = claims.getExpirationTime();
		return expiration;
	}

	public String getEmailFromToken(String token) {
		String email = "";
		try {
			JWTClaimsSet claims = getClaimsFromToken(token);
			if (claims != null) {
				email = claims.getStringClaim(USERNAME);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return email;
	}

	private byte[] generateShareSecret() {
		return SECRET_KEY.getBytes();
	}

	private Boolean isTokenExpired(String token) {
		Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	public Boolean validateTokenLogin(String token) {
		if (token == null || token.trim().length() == 0) {
			return false;
		}
		String username = getEmailFromToken(token);
		Optional<User> u = userRepository.findByEmail(username);
		if (u.isEmpty()) {
			return false;
		}
		if (username == null || username.isEmpty()) {
			return false;
		}
		if (isTokenExpired(token)) {
			return false;
		}

		return true;
	}

	public boolean isLogined() {
		String token = getTokenFromHeader();
		String username = getEmailFromToken(token);
		Optional<User> u = userRepository.findByEmail(username);
		if (u.isEmpty()) {
			return false;
		}
		return true;
	}

	public String getRolesFromToken(String token) {
		if (validateTokenLogin(token)) {
			Optional<User> user = userRepository.findByEmail(getEmailFromToken(token));
			if (user.isPresent()) {
				return user.get().getRole();
			} else {
				return "";
			}
		} else {
			return "";
		}
	}

	public String getTokenFromHeader() {
		return request.getHeader(TOKEN_HEADER);
	}

	public boolean acceptRole(String roleRequest) {
		String role = getRolesFromToken(getTokenFromHeader());
		if (role.equals("ROLE_ADMIN")) {
			return true;
		}
		return role.equals(roleRequest);
	}
}
