/// <reference path="../../typings/globals/jquery/index.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('bootstrap');
var map_1 = require('../shared/map');
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.mapString = '';
        this.width = 0;
        this.length = 0;
        this.rooms = 0;
    }
    DashboardComponent.prototype.generateMap = function (l, w, r) {
        if (this.validateInput(l, w, r)) {
            var map = new map_1.Map(Number.parseInt(w), Number.parseInt(l), Number.parseInt(r));
            map.createMap();
            this.mapString = map.toString();
        }
        else {
            this.mapString = '';
        }
    };
    DashboardComponent.prototype.validateInput = function (l, w, r) {
        l = Number.parseInt(l);
        w = Number.parseInt(w);
        r = Number.parseInt(r);
        var valid = false;
        this.validationText = '';
        if (l > 0 && w > 0 && r > 0) {
            if (l > 200) {
                this.validationText += 'Length needs to be less than 200!' + '\n';
            }
            if (w > 200) {
                this.validationText += 'Width needs to be less than 200!' + '\n';
            }
            if (r > ((l + w) / 2)) {
                this.validationText += 'Rooms need to be less than Length + Width divided by two!' + '\n';
            }
            else {
                valid = true;
            }
            if (!valid) {
                $('#validation-modal').modal('show');
            }
        }
        else {
            this.validationText = 'Length, Width, and Rooms need to be greater than 0!';
            $('#validation-modal').modal('show');
        }
        return valid;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map