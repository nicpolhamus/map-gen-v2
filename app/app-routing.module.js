"use strict";
var router_1 = require('@angular/router');
// Import components
//import { BaseComponent } from './base.component';
var dashboard_component_1 = require('./dashboard/dashboard.component');
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map