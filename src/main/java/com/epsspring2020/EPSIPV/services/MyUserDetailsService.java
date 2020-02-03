package com.epsspring2020.EPSIPV.services;


import com.epsspring2020.EPSIPV.daos.AuthDao;
import com.epsspring2020.EPSIPV.entities.User;
import com.epsspring2020.EPSIPV.entities.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    AuthDao authDao;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user;
        try {
            user = authDao.findUserByEmail(email);
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with email : " + email);
        }
        return UserPrincipal.create(user);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user;
        try {
            user = authDao.findUserById(id);
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with id : " + id);
        }
        return UserPrincipal.create(user);
    }
}
