export const updateUser  = {
        "put": {
            "summary": "Get all users. Admin only!",
            "tags": ["Users"],
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
                            "required": ["email", "username"],
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "description": "The updated email"
                                },
                                "username": {
                                    "type": "string",
                                    "description": "The updated username"
                                }
                            },
                            "example": {
                                "email": "newemail@mail.com",
                                "username": "newUsername"
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User updated successfully",
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

