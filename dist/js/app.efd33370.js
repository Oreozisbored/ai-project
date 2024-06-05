(function(){"use strict";var e={9696:function(e,t,n){var s=n(3751),i=n(641),o=n(33);const r={id:"app",ref:"chatContainer"},a={class:"App",ref:"chatContent"},l=(0,i.Lk)("div",{class:"menu-line"},null,-1),u=(0,i.Lk)("div",{class:"menu-line"},null,-1),c=(0,i.Lk)("div",{class:"menu-line"},null,-1),p=[l,u,c],d={key:0,class:"expanded-content"},h={class:"profile-section"},f={class:"grade-dropdown"},g=["value"],v=(0,i.Lk)("div",{class:"profile-picture"},null,-1),m={class:"text-area",ref:"chatMessages"},O={class:"chat-input"},y=["disabled"];function E(e,t,n,l,u,c){return(0,i.uX)(),(0,i.CE)("div",r,[(0,i.Lk)("div",a,[(0,i.Lk)("div",{class:(0,o.C4)(["menu-bar",{expanded:u.menuOpen}])},[(0,i.Lk)("div",{class:"menu-button",onClick:t[0]||(t[0]=(...e)=>c.toggleMenu&&c.toggleMenu(...e))},p),u.menuOpen?((0,i.uX)(),(0,i.CE)("div",d,"Made by Wilson Li :)")):(0,i.Q3)("",!0)],2),(0,i.Lk)("div",h,[(0,i.Lk)("select",f,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(u.grades,(e=>((0,i.uX)(),(0,i.CE)("option",{key:e,value:e},(0,o.v_)(e)+"th Grade",9,g)))),128))])]),v,(0,i.Lk)("div",m,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(u.responses,(e=>((0,i.uX)(),(0,i.CE)("div",{key:e.id,class:(0,o.C4)(c.isUserMessage(e.text)?"user-message":"ai-message")},[(0,i.Lk)("p",null,(0,o.v_)(e.text),1)],2)))),128))],512)],512),(0,i.Lk)("div",O,[(0,i.bo)((0,i.Lk)("input",{ref:"inputField",class:"text-box",type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>u.inputValue=e),onKeyup:t[2]||(t[2]=(0,s.jR)(((...e)=>c.sendMessage&&c.sendMessage(...e)),["enter"])),disabled:u.sendingMessage,placeholder:"Type your message here..."},null,40,y),[[s.Jo,u.inputValue]])])],512)}n(4114);var C=n(5719),k={name:"App",data(){return{menuOpen:!1,inputValue:"",responses:[],sendingMessage:!1,genAI:null,model:null,grades:[5,6,7,8,9,10,11,12],generationConfig:{temperature:1,topP:.95,topK:64,maxOutputTokens:8192},safetySettings:[{category:C.DE.HARM_CATEGORY_HARASSMENT,threshold:C.vk.BLOCK_LOW_AND_ABOVE},{category:C.DE.HARM_CATEGORY_HATE_SPEECH,threshold:C.vk.BLOCK_LOW_AND_ABOVE},{category:C.DE.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:C.vk.BLOCK_LOW_AND_ABOVE},{category:C.DE.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:C.vk.BLOCK_LOW_AND_ABOVE}]}},methods:{toggleMenu(){this.menuOpen=!this.menuOpen},async sendMessage(){if(""===this.inputValue.trim())return;this.sendingMessage=!0;const e=this.inputValue,t={id:Date.now(),text:`You: ${e}`};this.responses.push(t),this.inputValue="";try{const t=this.model.startChat({generationConfig:this.generationConfig,safetySettings:this.safetySettings,history:this.responses.map((e=>({role:"user",parts:[{text:e.text.slice(5)}]})))}),n=await t.sendMessage(e),s={id:Date.now(),text:`Gemini: ${await n.response.text()}`};this.responses.push(s)}catch(n){console.error("Error:",n)}finally{this.sendingMessage=!1,this.$nextTick((()=>{this.$refs.inputField.focus(),this.scrollToBottom()}))}},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatContainer;e.scrollTop=e.scrollHeight}))},isUserMessage(e){return e.startsWith("You:")}},async mounted(){const e="AIzaSyBQhziKC8Xmq59IX48qJnx4E7m7oxG9lJs",t="FILLER";this.genAI=new C.ij(e),this.model=this.genAI.getGenerativeModel({model:"gemini-1.5-flash",systemInstruction:t,history:this.responses.map((e=>({role:"user",parts:[{text:e.text.slice(5)}]})))}),this.scrollToBottom()}},A=n(6262);const L=(0,A.A)(k,[["render",E]]);var _=L;(0,s.Ef)(_).mount("#app")}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,s,i,o){if(!s){var r=1/0;for(c=0;c<e.length;c++){s=e[c][0],i=e[c][1],o=e[c][2];for(var a=!0,l=0;l<s.length;l++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](s[l])}))?s.splice(l--,1):(a=!1,o<r&&(r=o));if(a){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[s,i,o]}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,o,r=s[0],a=s[1],l=s[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(l)var c=l(n)}for(t&&t(s);u<r.length;u++)o=r[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},s=self["webpackChunkai_project"]=self["webpackChunkai_project"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(9696)}));s=n.O(s)})();
//# sourceMappingURL=app.efd33370.js.map