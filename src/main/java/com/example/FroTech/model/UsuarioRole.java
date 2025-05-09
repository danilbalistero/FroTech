package com.example.FroTech.model;

public enum UsuarioRole {

    ADMIN("admin"),
    MOTORISTA("motorista");

    private String role;

    UsuarioRole(String role) {
        this.role = role;
    }

    public String getRole (){
        return role;
    }

}
