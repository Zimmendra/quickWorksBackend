"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.AuthRole = void 0;
var AuthRole;
(function (AuthRole) {
    AuthRole["OPEN"] = "OPEN";
    AuthRole["PROCUREMENT_MANAGER"] = "PROCUREMENT_MANAGER";
    AuthRole["PROCUREMENT_ADMIN"] = "PROCUREMENT_ADMIN";
    AuthRole["SITE_MANAGER"] = "SITE_MANAGER";
    AuthRole["SUPERVISOR"] = "SUPERVISOR";
    AuthRole["SUPPLIER"] = "SUPPLIER";
})(AuthRole || (exports.AuthRole = AuthRole = {}));
var Status;
(function (Status) {
    Status["AVAILABLE"] = "AVAILABLE";
    Status["ACCEPTED"] = "ACCEPTED";
    Status["APPROVED"] = "APPROVED";
    Status["ONGOING"] = "ONGOING";
    Status["PAYMENT"] = "PAYMENT";
    Status["COMPLETED"] = "COMPLETED";
    Status["TOBEAPPROVED"] = "TOBEAPPROVED";
})(Status || (exports.Status = Status = {}));
