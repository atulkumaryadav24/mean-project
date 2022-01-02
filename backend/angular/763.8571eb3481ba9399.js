"use strict";(self.webpackChunkmean_project=self.webpackChunkmean_project||[]).push([[763],{3763:(O,l,a)=>{a.r(l),a.d(l,{AuthModule:()=>J});var m=a(6019),e=a(7537),_=a(2621),p=a(8799),t=a(1514),c=a(7079),g=a(888),d=a(7964),s=a(8167),f=a(138),h=a(86);function v(n,i){1&n&&t._UZ(0,"mat-spinner")}function S(n,i){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid Email"),t.qZA())}function Z(n,i){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid password"),t.qZA())}function A(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"form",2,3),t.NdJ("submit",function(){t.CHM(o);const u=t.MAs(1);return t.oxw().onLogin(u)}),t.TgZ(2,"mat-form-field"),t._UZ(3,"input",4,5),t.YNc(5,S,2,0,"mat-error",0),t.qZA(),t.TgZ(6,"mat-form-field"),t._UZ(7,"input",6,7),t.YNc(9,Z,2,0,"mat-error",0),t.qZA(),t.TgZ(10,"button",8),t._uU(11,"Login"),t.qZA(),t.qZA()}if(2&n){const o=t.MAs(4),r=t.MAs(8);t.xp6(5),t.Q6J("ngIf",o.invalid),t.xp6(4),t.Q6J("ngIf",r.invalid)}}function M(n,i){1&n&&t._UZ(0,"mat-spinner")}function T(n,i){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid Email"),t.qZA())}function L(n,i){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"Please enter a valid password"),t.qZA())}function I(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"form",2,3),t.NdJ("submit",function(){t.CHM(o);const u=t.MAs(1);return t.oxw().onSignup(u)}),t.TgZ(2,"mat-form-field"),t._UZ(3,"input",4,5),t.YNc(5,T,2,0,"mat-error",0),t.qZA(),t.TgZ(6,"mat-form-field"),t._UZ(7,"input",6,7),t.YNc(9,L,2,0,"mat-error",0),t.qZA(),t.TgZ(10,"button",8),t._uU(11,"Signup"),t.qZA(),t.qZA()}if(2&n){const o=t.MAs(4),r=t.MAs(8);t.xp6(5),t.Q6J("ngIf",o.invalid),t.xp6(4),t.Q6J("ngIf",r.invalid)}}const x=[{path:"login",component:(()=>{class n{constructor(o){this.authService=o,this.isLoading=!1}ngOnInit(){this.authStatusSubs=this.authService.getAuthStatusListener().subscribe(o=>{this.isLoading=!1})}onLogin(o){o.invalid||(this.isLoading=!0,this.authService.loginUser(o.value.email,o.value.password))}ngOnDestroy(){this.authStatusSubs.unsubscribe()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(c.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["LoginForm","ngForm"],["type","email","matInput","","name","email","ngModel","","placeholder","Email","required","","email",""],["emailInput","ngModel"],["type","password","matInput","","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-raised-button","","color","accent","type","submit"]],template:function(o,r){1&o&&(t.TgZ(0,"mat-card"),t.YNc(1,v,1,0,"mat-spinner",0),t.YNc(2,A,12,2,"form",1),t.qZA()),2&o&&(t.xp6(1),t.Q6J("ngIf",r.isLoading),t.xp6(1),t.Q6J("ngIf",!r.isLoading))},directives:[g.a8,m.O5,d.$g,e._Y,e.JL,e.F,s.KE,f.Nt,e.Fj,e.JJ,e.On,e.Q7,e.on,h.lW,s.TO],styles:["mat-card[_ngcontent-%COMP%]{margin:auto}mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),n})()},{path:"signup",component:(()=>{class n{constructor(o){this.authService=o,this.isLoading=!1}ngOnInit(){this.authStatusSubs=this.authService.getAuthStatusListener().subscribe(o=>{this.isLoading=!1})}onSignup(o){o.invalid||(this.isLoading=!0,this.authService.createUser(o.value.email,o.value.password))}ngOnDestroy(){this.authStatusSubs.unsubscribe()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(c.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["SignupForm","ngForm"],["type","email","matInput","","name","email","ngModel","","placeholder","Email","required","","email",""],["emailInput","ngModel"],["type","password","matInput","","name","password","ngModel","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-raised-button","","color","accent","type","submit"]],template:function(o,r){1&o&&(t.TgZ(0,"mat-card"),t.YNc(1,M,1,0,"mat-spinner",0),t.YNc(2,I,12,2,"form",1),t.qZA()),2&o&&(t.xp6(1),t.Q6J("ngIf",r.isLoading),t.xp6(1),t.Q6J("ngIf",!r.isLoading))},directives:[g.a8,m.O5,d.$g,e._Y,e.JL,e.F,s.KE,f.Nt,e.Fj,e.JJ,e.On,e.Q7,e.on,h.lW,s.TO],styles:["mat-card[_ngcontent-%COMP%]{margin:auto}mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.Bz.forChild(x)],p.Bz]}),n})(),J=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[m.ez,_.h,e.u5,y]]}),n})()}}]);