export const confirmEmailPaths  = {
    "/api/v1/auth/confirm-email": {
        "get": {
            "summary": "Get confirmation link with token via email.",
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
    "/api/v1/auth/confirm-email/{id}/{token}": {
        "get": {
            "summary": "Confirm email address with a token",
            "tags": ["Auth"],
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "User ID"
                },
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
            "responses": {
                "200": {
                    "description": "HTML page with email confirmation message",
                    "content": {
                        "text/html": {
                            "schema": {
                                "type": "string",
                                "example": "<!DOCTYPE html><html><head><title>Email Confirmation</title></head><body><h1>Email Confirmed</h1></body></html>"
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