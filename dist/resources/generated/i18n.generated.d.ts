import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "auth": {
        "errors": {
            "unauthorized": string;
            "loginFirst": string;
            "wrongCredentials": string;
            "register": string;
            "login": string;
            "ability": {
                "create": string;
                "read": string;
                "update": string;
                "delete": string;
            };
        };
        "success": {};
    };
    "entities": {
        "user": string;
        "admin": string;
        "post": string;
        "comment": string;
        "room": string;
        "message": string;
        "email": string;
        "notification": string;
        "course": string;
    };
    "shared": {
        "success": {
            "create": string;
            "update": string;
            "delete": string;
            "reject": string;
            "approve": string;
            "logout": string;
        };
        "errors": {
            "create": string;
            "update": string;
            "delete": string;
            "readAll": string;
            "readOne": string;
            "reject": string;
            "approve": string;
            "userAlreadyExist": string;
        };
    };
    "validation": {
        "isNotEmpty": string;
        "min": string;
        "isString": string;
        "isInt": string;
        "max": string;
        "email": string;
        "minLength": string;
        "phoneNumber": string;
        "maxLength": string;
        "uniqueProperty": string;
        "passwordContains": {
            "uppercase": string;
            "lowercase": string;
            "number": string;
            "specialCharacter": string;
        };
        "confirmPasswordContains": {
            "uppercase": string;
            "lowercase": string;
            "number": string;
            "specialCharacter": string;
        };
        "date": string;
        "confirmPasswordMatch": string;
        "invalidMongoDBID": string;
        "throttlerError": string;
        "fileType": string;
        "fileSize": string;
    };
};
export type I18nPath = Path<I18nTranslations>;
