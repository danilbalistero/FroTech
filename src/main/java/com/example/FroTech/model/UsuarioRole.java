package com.example.FroTech.model;

public enum UsuarioRole {
    ADMIN("ROLE_ADMIN"),
    MOTORISTA("ROLE_MOTORISTA");

    private String role;

    UsuarioRole(String role) {
        this.role = role;
    }

    public String getRole (){
        return role;
    }

}
