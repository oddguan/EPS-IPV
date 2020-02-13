package com.epsspring2020.EPSIPV.daos;

import com.epsspring2020.EPSIPV.entities.Role;
import com.epsspring2020.EPSIPV.entities.RoleName;
import com.epsspring2020.EPSIPV.entities.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AuthDao {

    /**
     * fetch the user detail from an email address.
     * Email addresses are unique in the database, meaning that one email address
     * can only be associated with one account, so this method is guaranteed to
     * return only one user or none user.
     * @param email The email address as a String.
     * @return the fetched user detail.
     */
    public User findUserByEmail(String email);

    /**
     * fetch the use detail from username.
     * Username is unique in the database just like email address.
     * This method can be used to verify whether username is already taken so
     * the front end can prompt user to change to a new username.
     * @param username The username as a string.
     * @return the fetched user detail.
     */
    public User findUserByUsername(String username);

    /**
     * Save a new user into the database. This method is generally used by the registration pipeline.
     * @param user User details to be registered.
     * @return An integer indicating whether the operation was successful or not
     */
    public int saveUserInfo(User user);

    /**
     * Fetch the user detail from a database id.
     * @param id userid as a Long
     * @return User details
     */
    public User findUserById(Long id);

    /**
     * Fetch the Role object by providing a RoleName object. Used for relating two tables.
     * @param roleName RoleName object defined in entities
     * @return The role of the roleName
     */
    public Role findRoleByRoleName(RoleName roleName);
}
