(function(){"use strict";var e={2414:function(e,t,n){var o=n(5130),s=n(6768),i=n(4232);const a={id:"app",ref:"chatContainer"},r={class:"App",ref:"chatContent"},l=(0,s.Lk)("div",{class:"menu-line"},null,-1),u=(0,s.Lk)("div",{class:"menu-line"},null,-1),p=(0,s.Lk)("div",{class:"menu-line"},null,-1),c=[l,u,p],d={key:0,class:"expanded-content"},h={class:"profile-section"},g={class:"grade-dropdown"},m=["value"],f={key:0,class:"profile-menu"},E=(0,s.Lk)("div",{class:"profile-menu-bar1"},null,-1),y=(0,s.Lk)("div",{class:"profile-menu-bar2"},null,-1),_={key:0},v=(0,s.Lk)("h2",null,"Login",-1),L=(0,s.Lk)("button",{type:"submit"},"Login",-1),k={key:1},N=(0,s.Lk)("h2",null,"Sign Up",-1),O=(0,s.Lk)("button",{type:"submit"},"Sign Up",-1),A={key:2},C=(0,s.Lk)("h2",null,"Profile Information",-1),D={class:"text-area",ref:"chatMessages"},M={class:"chat-input"},w=["disabled"];function P(e,t,n,l,u,p){return(0,s.uX)(),(0,s.CE)("div",a,[(0,s.Lk)("div",r,[(0,s.Lk)("div",{class:(0,i.C4)(["menu-bar",{expanded:u.menuOpen}])},[(0,s.Lk)("div",{class:"menu-button",onClick:t[0]||(t[0]=(...e)=>p.toggleMenu&&p.toggleMenu(...e))},c),u.menuOpen?((0,s.uX)(),(0,s.CE)("div",d,"Made by Wilson Li :)")):(0,s.Q3)("",!0)],2),(0,s.Lk)("div",h,[(0,s.Lk)("select",g,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(u.grades,(e=>((0,s.uX)(),(0,s.CE)("option",{key:e,value:e},(0,i.v_)(e)+"th Grade",9,m)))),128))])]),(0,s.Lk)("div",{class:"profile-button",onClick:t[1]||(t[1]=(...e)=>p.toggleProfileMenu&&p.toggleProfileMenu(...e))},"Profile"),u.profileMenuOpen?((0,s.uX)(),(0,s.CE)("div",f,[(0,s.Lk)("div",{class:"profile-menu-close",onClick:t[2]||(t[2]=(...e)=>p.toggleProfileMenu&&p.toggleProfileMenu(...e))}),E,y,"login"===u.currentForm?((0,s.uX)(),(0,s.CE)("div",_,[v,(0,s.Lk)("form",{onSubmit:t[6]||(t[6]=(0,o.D$)(((...e)=>p.handleLogin&&p.handleLogin(...e)),["prevent"]))},[(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":t[3]||(t[3]=e=>u.loginData.email=e),placeholder:"Email",required:""},null,512),[[o.Jo,u.loginData.email]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[4]||(t[4]=e=>u.loginData.password=e),placeholder:"Password",required:""},null,512),[[o.Jo,u.loginData.password]]),L,(0,s.Lk)("p",{onClick:t[5]||(t[5]=e=>p.switchForm("signup"))},"Don't have an account? Sign up")],32)])):(0,s.Q3)("",!0),"signup"===u.currentForm?((0,s.uX)(),(0,s.CE)("div",k,[N,(0,s.Lk)("form",{onSubmit:t[11]||(t[11]=(0,o.D$)(((...e)=>p.handleSignup&&p.handleSignup(...e)),["prevent"]))},[(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[7]||(t[7]=e=>u.signupData.fullName=e),placeholder:"Full Name",required:""},null,512),[[o.Jo,u.signupData.fullName]]),(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":t[8]||(t[8]=e=>u.signupData.email=e),placeholder:"Email",required:""},null,512),[[o.Jo,u.signupData.email]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[9]||(t[9]=e=>u.signupData.password=e),placeholder:"Password",required:""},null,512),[[o.Jo,u.signupData.password]]),O,(0,s.Lk)("p",{onClick:t[10]||(t[10]=e=>p.switchForm("login"))},"Already have an account? Login")],32)])):(0,s.Q3)("",!0),"profile"===u.currentForm?((0,s.uX)(),(0,s.CE)("div",A,[C,(0,s.Lk)("p",null,"Full Name: "+(0,i.v_)(u.profileData.fullName),1),(0,s.Lk)("p",null,"Email: "+(0,i.v_)(u.profileData.email),1),(0,s.Lk)("button",{onClick:t[12]||(t[12]=(...e)=>p.handleLogout&&p.handleLogout(...e))},"Logout")])):(0,s.Q3)("",!0)])):(0,s.Q3)("",!0),(0,s.Lk)("div",D,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(u.responses,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:(0,i.C4)(p.isUserMessage(e.text)?"user-message":"ai-message")},[(0,s.Lk)("p",null,(0,i.v_)(e.text),1)],2)))),128))],512)],512),(0,s.Lk)("div",M,[(0,s.bo)((0,s.Lk)("input",{ref:"inputField",class:"text-box",type:"text","onUpdate:modelValue":t[13]||(t[13]=e=>u.inputValue=e),onKeyup:t[14]||(t[14]=(0,o.jR)(((...e)=>p.sendMessage&&p.sendMessage(...e)),["enter"])),disabled:u.sendingMessage,placeholder:"Type your message here..."},null,40,w),[[o.Jo,u.inputValue]])])],512)}n(4114);var b=n(4687),S=n(114),U=n(6400),V=n(7844),x=n(8704),I=n(6288);const R={apiKey:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_API_KEY,authDomain:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_AUTH_DOMAIN,projectId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_PROJECT_ID,storageBucket:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_STORAGE_BUCKET,messagingSenderId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_MESSAGING_SENDER_ID,appId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_APP_ID,measurementId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_MEASUREMENT_ID},T=(0,U.Wp)(R),F=(0,S.xI)(T),B=(0,V.c7)(T);var H={name:"App",SpeedInsights:b.b,data(){return{menuOpen:!1,profileMenuOpen:!1,inputValue:"",responses:[],sendingMessage:!1,genAI:null,model:null,grades:[5,6,7,8,9,10,11,12],generationConfig:{temperature:1,topP:.95,topK:64,maxOutputTokens:8192},safetySettings:[{category:I.DE.HARM_CATEGORY_HARASSMENT,threshold:I.vk.BLOCK_NONE},{category:I.DE.HARM_CATEGORY_HATE_SPEECH,threshold:I.vk.BLOCK_NONE},{category:I.DE.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:I.vk.BLOCK_NONE},{category:I.DE.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:I.vk.BLOCK_NONE}],currentForm:"login",loginData:{email:"",password:""},signupData:{fullName:"",email:"",password:""},profileData:{fullName:"",email:""},errorMessage:""}},methods:{toggleMenu(){this.menuOpen=!this.menuOpen},toggleProfileMenu(){this.profileMenuOpen=!this.profileMenuOpen},switchForm(e){this.currentForm=e,this.errorMessage=""},async handleSignup(){const{fullName:e,email:t,password:n}=this.signupData;try{const o=await(0,S.eJ)(F,t,n),s=o.user;await(0,S.r7)(s,{displayName:e}),this.profileData={fullName:s.displayName,email:s.email},this.switchForm("profile")}catch(o){"auth/email-already-in-use"===o.code?this.errorMessage="The email address is already in use.":this.errorMessage="Signup error. Please try again."}},async handleLogin(){const{email:e,password:t}=this.loginData;try{const n=await(0,S.x9)(F,e,t),o=n.user;this.profileData={fullName:o.displayName,email:o.email},this.switchForm("profile"),this.loadChatHistory(o.uid)}catch(n){this.errorMessage="Login error. Please try again."}},async handleLogout(){try{await(0,S.CI)(F),this.profileData={fullName:"",email:""},this.switchForm("login")}catch(e){console.error("Logout error:",e)}},async sendMessage(){if(""===this.inputValue.trim())return;this.sendingMessage=!0;const e=this.inputValue,t={id:Date.now(),text:`You: ${e}`};this.responses.push(t),this.inputValue="";try{const t=this.model.startChat({generationConfig:this.generationConfig,safetySettings:this.safetySettings,history:this.responses.map((e=>({role:"user",parts:[{text:e.text.slice(5)}]})))}),n=await t.sendMessage(e),o={id:Date.now(),text:`Gemini: ${await n.response.text()}`};this.responses.push(o)}catch(n){console.error("Error:",n)}finally{this.sendingMessage=!1,this.$nextTick((()=>{this.$refs.inputField.focus(),this.scrollToBottom()}))}this.saveChatHistory()},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatContainer;e.scrollTop=e.scrollHeight}))},isUserMessage(e){return e.startsWith("You:")},async saveChatHistory(){const e=F.currentUser;if(!e)return;const t=JSON.stringify(this.responses);x.A.set("chatHistory",t);const n=(0,V.KR)(B,`chats/${e.uid}.json`);try{await(0,V.ls)(n,t)}catch(o){console.error("Error saving chat history:",o)}},async loadChatHistory(e){const t=x.A.get("chatHistory");if(t)return void(this.responses=JSON.parse(t));const n=(0,V.KR)(B,`chats/${e}.json`);try{const e=await(0,V.qk)(n),t=await fetch(e),o=await t.json();this.responses=o}catch(o){console.error("Error loading chat history:",o)}}},async mounted(){const e={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_GEMINI_API_KEY;this.genAI=new I.ij(e),this.model=this.genAI.getGenerativeModel({model:"gemini-1.5-flash",systemInstruction:"",history:this.responses.map((e=>({role:"user",parts:[{text:e.text.slice(5)}]})))}),this.scrollToBottom()}},j=n(1241);const K=(0,j.A)(H,[["render",P]]);var G=K,X=n(1387);const J=[{path:"/",component:G}],$=(0,X.aE)({history:(0,X.LA)(),routes:J});(0,o.Ef)(G).use($).mount("#app")}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,s,i){if(!o){var a=1/0;for(p=0;p<e.length;p++){o=e[p][0],s=e[p][1],i=e[p][2];for(var r=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(r=!1,i<a&&(a=i));if(r){e.splice(p--,1);var u=s();void 0!==u&&(t=u)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[o,s,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var s,i,a=o[0],r=o[1],l=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(s in r)n.o(r,s)&&(n.m[s]=r[s]);if(l)var p=l(n)}for(t&&t(o);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(p)},o=self["webpackChunkai_project"]=self["webpackChunkai_project"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(2414)}));o=n.O(o)})();
//# sourceMappingURL=app.f85d24c8.js.map