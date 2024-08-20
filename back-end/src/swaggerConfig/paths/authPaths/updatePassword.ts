export const updatePasswordPaths  = {
    "/api/v1/auth/login": {
        "post": {
            "summary": "Update password",
            "tags": ["Auth"],
            "security": [
                {
                    "bearerAuth": [] as any
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["passwordOld","passwordNew", "passwordConfirm" ],
                            "properties": {
                                "passwordOld": {
                                    "type": "string",
                                    "description": "Current password"
                                },
                                "passwordNew": {
                                    "type": "string",
                                    "description": "New password"
                                },
                                "passwordConfirm": {
                                    "type": "string",
                                    "description": "Repeat password"
                                }
                            },
                            "example": {
                                "passwordOld": "password123",
                                "passwordNew": "password12",
                                "passwordConfirm": "password12"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Password updated successfully",
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
                    "description": "Current password is wrong or the access token is missing/revoked/expired ",
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

