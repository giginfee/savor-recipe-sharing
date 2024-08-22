export const forgotPasswordPaths  = {
    "/api/v1/auth/forgot-password": {
        "get": {
            "summary": "Get reset password token via email.",
            "tags": ["Auth"],
            "security": [
                {
                    "bearerAuth": [] as any
                }
            ],
            "responses": {
                "200": {
                    "description": "Email was sent successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string"
                                    },
                                    "data": {
                                        "type": "object",
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
                "401": {
                    "description": "The access token is missing/revoked/expired ",
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
    },
    "/api/v1/auth/forgot-password/{token}": {
        "patch": {
            "summary": "Reset password",
            "tags": ["Auth"],
            "security": [
                {
                    "bearerAuth": [] as any
                }
            ],
            "parameters": [
                {
                    "in": "path",
                    "name": "token",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "Confirmation token retrieved through email"
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["password"],
                            "properties": {
                                "password": {
                                    "type": "string",
                                    "description": "New password"
                                }
                            },
                            "example": {
                                "password": "password123"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "HTML page with email confirmation message",
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
                "401": {
                    "description": "The access token is missing/revoked/expired ",
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