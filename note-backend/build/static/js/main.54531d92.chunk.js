(this.webpackJsonppractice=this.webpackJsonppractice||[]).push([[0],{39:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(0),r=e(2),o=e(15),i=e.n(o),a=e(6),u=e(3),s=function(t){var n=t.note,e=t.toggleImportance,r=n.important?"make not important":"make important";return Object(c.jsxs)("li",{className:"note",children:[n.content,Object(c.jsx)("button",{onClick:e,children:r})]})},j=e(4),l=e.n(j),b="/api/notes",f=function(){return l.a.get(b).then((function(t){return t.data}))},d=function(t){return l.a.post(b,t).then((function(t){return t.data}))},O=function(t,n){return l.a.put("".concat(b,"/").concat(t),n).then((function(t){return t.data}))},h=function(t){var n=t.message;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},m=function(){return Object(c.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(c.jsx)("br",{}),Object(c.jsx)("em",{children:"Note app, Fredrik Mellberg 2020"})]})},p=function(){var t=Object(r.useState)([]),n=Object(u.a)(t,2),e=n[0],o=n[1],i=Object(r.useState)("a new note..."),j=Object(u.a)(i,2),l=j[0],b=j[1],p=Object(r.useState)(!0),x=Object(u.a)(p,2),v=x[0],g=x[1],S=Object(r.useState)(null),k=Object(u.a)(S,2),w=k[0],y=k[1];Object(r.useEffect)((function(){f().then((function(t){o(t)}))}),[]);var N=v?e:e.filter((function(t){return t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)(h,{message:w}),Object(c.jsx)("div",{children:Object(c.jsxs)("button",{onClick:function(){return g(!v)},children:["show ",v?"important only":"all"]})}),Object(c.jsx)("ul",{children:N.map((function(t){return Object(c.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});O(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(c){y("Note '".concat(n.content," was already removed from the server")),setTimeout((function(){return y(null)}),5e3),o(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={id:e.length+1,content:l,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){o(e.concat(t)),b("")}))},children:[Object(c.jsx)("input",{value:l,onChange:function(t){b(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]}),Object(c.jsx)(m,{})]})};e(39);i.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.54531d92.chunk.js.map