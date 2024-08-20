export const loginPaths  = {
    "/api/v1/auth/login": {
        "post": {
            "summary": "Log in a user",
            "tags": ["Auth"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["email", "password"],
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "description": "The email of the user"
                                },
                                "password": {
                                    "type": "string",
                                    "description": "The password of the user"
                                }
                            },
                            "example": {
                                "email": "test@mail.com",
                                "password": "password123"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User logged in successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string"
                                    },
                                    "token": {
                                        "type": "string",
                                        "description": "JWT token for authentication"
                                    },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "user": {
                                                "$ref": "#/components/schemas/User"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Error"
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Error"
                            }
                        }
                    }
                }
            }
        }
    }
}

