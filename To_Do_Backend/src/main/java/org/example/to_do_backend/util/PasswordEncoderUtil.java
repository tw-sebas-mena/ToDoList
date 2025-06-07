package org.example.to_do_backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {
    public static void main(String[] args){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String password1 = "sebas2012";
        String password2 = "secondpassword2";

        String hashedPassword1 = bCryptPasswordEncoder.encode(password1);
        String hashedPassword2 = bCryptPasswordEncoder.encode(password2);

        System.out.println("------------------");
        System.out.println(hashedPassword1);
        System.out.println("------------------");
        System.out.println(hashedPassword2);
    }
}
