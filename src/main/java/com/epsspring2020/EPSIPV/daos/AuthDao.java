package com.epsspring2020.EPSIPV.daos;

import com.epsspring2020.EPSIPV.entities.Role;
import com.epsspring2020.EPSIPV.entities.RoleName;
import com.epsspring2020.EPSIPV.entities.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AuthDao {

    public User findUserByEmail(String email);

    public int saveUserInfo(User user);

    public User findUserById(Long id);

    public Role findRoleByRoleName(RoleName roleName);
}
