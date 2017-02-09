package com.heshilao.utils;

import org.apache.commons.codec.digest.DigestUtils;


/**
 * MD5+盐，密码加密
 *
 * @author zhufeng
 * @since p2p_cloud_v1.0
 */
public final class PasswordEncryption
{

    private PasswordEncryption()
    {
    }

    public static String encrypt(String salt, String password)
    {
        String usernameMD5 = DigestUtils.md5Hex(salt.trim()).toUpperCase();
        String passworMD5 = DigestUtils.md5Hex(password.trim()).toUpperCase();
        return DigestUtils.md5Hex(usernameMD5 + passworMD5).toUpperCase();
    }

    public static void main(String[] args)
    {
        System.out.println(encrypt("ssbtest2", "123456"));

        System.out.println(encrypt("admin", "123456"));
        System.out.println(encrypt("15301301855", "w89932801"));

        // resetAllOperatorPassword();
    }

    // 更新后台密码
    @SuppressWarnings("unused")
    private static void resetAllOperatorPassword()
    {
        // -- select concat('System.out.println(String.format("update manage_operator set password=%s where id=%s"',
        // ',encrypt("',operatorname,'","','123456','"),',id,");") from manage_operator
    }

}
