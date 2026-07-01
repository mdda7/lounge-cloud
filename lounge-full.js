/* ==================================================
   شات لاونج — نسخة سحابية مرتبة للقراءة V2
   ==================================================
   هذه نسخة ترتيب بصري فقط:
   - فواصل كبيرة وواضحة بين الأقسام.
   - ملاحظات سريعة فوق الأقسام المهمة.
   - بدون تغيير مقصود في منطق الأكواد أو أسماء المتغيرات.
   ================================================== */





/* ==================================================
   1) الإيموجي والملصقات
   ==================================================
   التعديل السريع:
   - تصغير حجم الإيموجي.
   - إخفاء ملصق محدد من شبكة الملصقات.
   ================================================== */
$('<style>.emoi{max-height:35px!important}</style>').insertBefore("body");
$('<style>#thStickerGrid > img:nth-child(15){display:none}</style>').insertBefore("body");



/* ==================================================
   2) عداد إشعارات الفلتر
   ==================================================
   التعديل السريع:
   - إبقاء عداد الإشعارات على صفر.
   ================================================== */
(function () {
    function forceFilterZero() {
        var count = document.getElementById('notification-count');
        if (count) count.textContent = '0';

    }

    forceFilterZero();
    setInterval(forceFilterZero, 300);

})();



/* ==================================================
   3) توحيد لون حالة المستخدم
   ==================================================
   التعديل السريع:
   - تغيير ألوان أيقونات الحالة s0 / s1 / s2.
   ================================================== */
(function () {
    $("#loungeUnifiedUserStatusColor").remove();
    var css = 'img.ustat[src*="imgs/s0.png"],img.ustat[src*="imgs/s1.png"],img.ustat[src*="imgs/s2.png"]{filter:brightness(0) saturate(100%) invert(48%) sepia(51%) saturate(889%) hue-rotate(331deg) brightness(91%) contrast(82%)!important;opacity:.88!important;}';
    $("<style id='loungeUnifiedUserStatusColor'></style>").html(css).appendTo("head");

})();



/* ==================================================
   4) تأكيد أوامر الإدارة
   ==================================================
   التعديل السريع:
   - تأكيد قبل حذف الصورة / الباند / الطرد / الإسكات.
   ================================================== */
(function () {
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.udelpic, .uban, .ukick, .ban20, .ban20-btn, .urkick, .meiut');
        if (!btn) return;
        var message = 'هل أنت متأكد؟';
        if (btn.classList.contains('udelpic'))      message = 'هل أنت متأكد من حذف صورة هذا العضو؟';
        else if (btn.classList.contains('uban'))    message = 'هل أنت متأكد من عمل باند لهذا العضو؟';
        else if (btn.classList.contains('ukick'))   message = 'هل أنت متأكد من طرد هذا العضو؟';
        else if (btn.classList.contains('ban20') || btn.classList.contains('ban20-btn')) message = 'هل أنت متأكد من عمل باند مؤقت لهذا العضو؟';
        else if (btn.classList.contains('urkick'))  message = 'هل أنت متأكد من طرد هذا العضو من الغرفة؟';
        else if (btn.classList.contains('meiut'))   message = 'هل أنت متأكد من إسكات هذا العضو؟';
        if (!confirm(message)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;

        }


    }, true);

})();



/* ==================================================
   5) صوت التنبيه المخصص
   ==================================================
   التعديل السريع:
   - SOUND_URL = رابط صوت التنبيه.
   - VOLUME = مستوى الصوت.
   - MIN_GAP_MS = أقل فاصل بين تشغيلين.
   ================================================== */
(function () {
    if (window.__loungeCustomAlertSoundV134) return;
    window.__loungeCustomAlertSoundV134 = true;
    var SOUND_URL = "https://files.catbox.moe/md0dkj.mp3";
    var VOLUME = 0.70, MIN_GAP_MS = 900, lastPlay = 0;
    var OLD_SOUND_KEYWORD = "/imgs/beep.mp3";
    var soundedUnreadChats = Object.create(null);
    var notifySound = new Audio(SOUND_URL);
    notifySound.preload = "auto";
    notifySound.volume = VOLUME;
    notifySound.setAttribute("data-lounge-custom-alert","1");
    function playCustomSound() {
        var now = Date.now();
        if (now - lastPlay < MIN_GAP_MS) return;
        lastPlay = now;
        try {
            notifySound.pause();
            notifySound.currentTime=0;
            notifySound.play().catch(function(){

            });

        }
         catch(e){

        }


    }

    if (!window.__loungeBlockOldBeepSoundV134) {
        window.__loungeBlockOldBeepSoundV134 = true;
        var originalPlay = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () {
            try {
                var src = this.currentSrc || this.src || this.getAttribute("src") || "";
                var isCustom = this.getAttribute && this.getAttribute("data-lounge-custom-alert") === "1";
                if (!isCustom && src.indexOf(OLD_SOUND_KEYWORD) !== -1) {
                    try {
                        this.pause();
                        this.currentTime=0;

                    }
                     catch(e){

                    }

                    playCustomSound();
                    return Promise.resolve();

                }


            }
             catch(e){

            }

            return originalPlay.apply(this, arguments);

        };

    }

    function isNotifyContainer(el) {
        return el && el.nodeType===1 && el.classList && el.classList.contains("hand") && el.classList.contains("corner") && el.classList.contains("nosel");

    }

    function isTargetAlertBox(el) {
        return (isNotifyContainer(el) && el.querySelector && el.querySelector(".NotReply")) || (isNotifyContainer(el) && el.textContent && el.textContent.indexOf("حصلت على إعجاب")!==-1);

    }

    function scanAlertNode(node) {
        if (!node || node.nodeType!==1) return;
        if (isTargetAlertBox(node)) {
            playCustomSound();
            return;

        }

        if (node.querySelectorAll) {
            var boxes=node.querySelectorAll(".hand.corner.nosel");
            for(var i=0;
            i<boxes.length;
            i++) if(isTargetAlertBox(boxes[i])){
                playCustomSound();
                return;

            }

        }


    }

    function getChatKey(chatEl) {
        if (!chatEl) return "";
        var k=chatEl.getAttribute("data-lid");
        if(k) return k;
        var h=chatEl.querySelector(".uhashe,.thUserHashExtra");
        if(h&&h.textContent){
            k=h.textContent.replace(/\s+/g,"").trim();
            if(k)return k;

        }

        if(chatEl.id) return chatEl.id;
        var o=chatEl.querySelector("[onclick*='openw']");
        if(o){
            var m=(o.getAttribute("onclick")||"").match(/openw\(['"]([^'"]+)['"]/);
            if(m)return m[1];

        }

        return "";

    }

    function findChatWrapper(el) {
        if(!el||el.nodeType!==1) return null;
        if(el.classList&&el.classList.contains("cc")) return el;
        return el.closest?el.closest(".cc"):null;

    }

    function scanPrivateChats() {
        var chats=document.querySelectorAll(".cc"),cur=Object.create(null),play=false;
        for(var i=0;
        i<chats.length;
        i++){
            var k=getChatKey(chats[i]);
            if(!k)continue;
            if(chats[i].classList&&chats[i].classList.contains("unread")){
                cur[k]=true;
                if(!soundedUnreadChats[k]){
                    soundedUnreadChats[k]=true;
                    play=true;

                }

            }

        }

        Object.keys(soundedUnreadChats).forEach(function(k){
            if(!cur[k])delete soundedUnreadChats[k];

        });
        if(play) playCustomSound();

    }

    setTimeout(function(){
        document.querySelectorAll(".cc.unread").forEach(function(c){
            var k=getChatKey(c);
            if(k)soundedUnreadChats[k]=true;

        });

    },500);
    new MutationObserver(function(mutations){
        var scan=false;
        mutations.forEach(function(m){
            Array.prototype.forEach.call(m.addedNodes||[],function(n){
                scanAlertNode(n);
                if(n&&n.nodeType===1&&(findChatWrapper(n)||(n.querySelector&&n.querySelector(".cc,.uhashe,.thUserHashExtra,.u-msg,.thUMsg"))))scan=true;

            });
            if(m.target&&m.target.nodeType===1&&(findChatWrapper(m.target)||(m.target.classList&&(m.target.classList.contains("unread")||m.target.classList.contains("u-msg")||m.target.classList.contains("thUMsg")||m.target.classList.contains("uhashe")||m.target.classList.contains("thUserHashExtra")))))scan=true;
            if(m.type==="characterData")scan=true;

        });
        if(scan)setTimeout(scanPrivateChats,80);

    }).observe(document.body,{
        childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["class","data-lid"]
    });

})();



/* ==================================================
   6) اختيار لون الاسم بالكود
   ==================================================
   التعديل السريع:
   - إضافة خانة لإدخال كود HEX مثل #a98484.
   ================================================== */
(function () {
    'use strict';
    if (window.__loungeNameColorCodeV134) return;
    window.__loungeNameColorCodeV134 = true;
    function isValidHexColor(v){
        return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);

    }

    function normalizeHex(v){
        v=String(v||'').trim();
        if(!v)return '';
        if(v.charAt(0)!=='#')v='#'+v;
        if(/^#([0-9a-fA-F]{3})$/.test(v))v='#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3];
        return v.toLowerCase();

    }

    function addCodeBox(container){
        if(!container||!container.querySelector('.colorSelector')||container.querySelector('.lounge-color-code-box'))return;
        container.style.setProperty('height','240px','important');
        container.style.setProperty('line-height','normal','important');
        container.style.setProperty('overflow-y','auto','important');
        var box=document.createElement('div');
        box.className='lounge-color-code-box';
        box.style.cssText='width:100%;height:38px;box-sizing:border-box;padding:5px;background:#f1f1f1;border-bottom:1px solid #c9c9c9;direction:rtl;display:flex;align-items:center;gap:4px;position:sticky;top:0;z-index:9999';
        box.innerHTML='<span style="font-size:12px;font-weight:bold;color:#333;white-space:nowrap;">كود</span>'
        +'<input class="lounge-name-color-input" type="text" placeholder="#a98484" maxlength="7" style="width:82px;height:25px;padding:2px 5px;direction:ltr;text-align:center;border:1px solid #777;border-radius:3px;outline:none;font-size:12px;background:#fff;color:#111;">'
        +'<span class="lounge-name-color-preview" style="width:25px;height:25px;display:inline-block;border:1px solid #777;border-radius:3px;background:#000;"></span>'
        +'<button type="button" class="lounge-name-color-apply" style="height:25px;padding:0 7px;border:1px solid #777;border-radius:3px;background:#3e3e3e;color:#fff;font-size:12px;cursor:pointer;white-space:nowrap;">تطبيق</button>';
        container.insertBefore(box,container.firstChild);
        var input=box.querySelector('.lounge-name-color-input');
        var preview=box.querySelector('.lounge-name-color-preview');
        var apply=box.querySelector('.lounge-name-color-apply');
        function updatePreview(){
            var c=normalizeHex(input.value);
            if(isValidHexColor(c)){
                input.value=c;
                preview.style.backgroundColor=c;
                input.style.borderColor=c;
                apply.style.backgroundColor=c;

            }
            else{
                input.style.borderColor='#c33';

            }

        }

        function applyColor(){
            var c=normalizeHex(input.value);
            if(!isValidHexColor(c)){
                alert('اكتب كود لون صحيح مثل #a98484');
                return;

            }

            input.value=c;
            preview.style.backgroundColor=c;
            apply.style.backgroundColor=c;
            var old=container.querySelector('.colorSelector[data-v="'+c+'"]');
            if(old){
                old.click();
                return;

            }

            var btn=document.createElement('button');
            btn.type='button';
            btn.className='colorSelector lounge-custom-color-btn';
            btn.setAttribute('data-v',c);
            btn.style.cssText='border:2px solid #fff;outline:none;width:40px;height:40px;background-color:'+c+';display:inline-block;box-shadow:inset 0 0 0 1px #333;';
            container.insertBefore(btn,box.nextSibling);
            setTimeout(function(){
                btn.click();

            },50);

        }

        input.addEventListener('input',updatePreview);
        input.addEventListener('keydown',function(e){
            if(e.key==='Enter'){
                e.preventDefault();
                applyColor();

            }

        });
        apply.addEventListener('click',applyColor);

    }

    function scanColorBoxes(){
        document.querySelectorAll('.colors-container').forEach(addCodeBox);

    }

    scanColorBoxes();
    document.addEventListener('click',function(){
        setTimeout(scanColorBoxes,100);
        setTimeout(scanColorBoxes,400);
        setTimeout(scanColorBoxes,900);

    },true);
    new MutationObserver(scanColorBoxes).observe(document.body,{
        childList:true,subtree:true
    });

})();



/* ==================================================
   7) التحكم بمنع سماع الصوت
   ==================================================
   التعديل السريع:
   - PROTECTED_NAMES = أسماء لا تظهر في قائمة المنع.
   - لا تعدّل WebRTC إلا بحذر.
   ================================================== */
(function () {
    'use strict';
    if (window.__LOUNGE_MIC_BLOCK_V134__) return;
    window.__LOUNGE_MIC_BLOCK_V134__ = true;
    var SOCK_KEY = 'x' + '_' + 'x';
    var EMIT_KEY = 'e' + 'm' + 'it';
    var HOOK_FLAG = '__l_' + 'hooked';
    function getSock() {
        return window[SOCK_KEY];

    }

    var PCS     = new Set();
    var REG     = new Map();
    var blocked = new Set();
    var PROTECTED_NAMES = new Set([
    'يحيى',
    'جـ,ـوُلُـِـِِـِِِـِِـِـي',
    'كـــنـــان',
    '𝓽𝓸𝓹',
    'غدوش',
    ]);
    function cleanName(name) {
        try {
            return String(name || '')
            .normalize('NFC')
            .replace(/\s+/g, ' ')
            .trim();

        }
         catch (e) {
            return String(name || '')
            .replace(/\s+/g, ' ')
            .trim();

        }


    }

    function isProtectedName(name) {
        return PROTECTED_NAMES.has(cleanName(name));

    }

    function getMemberByUid(uid) {
        uid = String(uid || '');
        return getRoomMembers().find(function (m) {
            return String(m.uid || '') === uid;

        }) || null;

    }

    function isProtectedUid(uid) {
        var member = getMemberByUid(uid);
        return !!(member && isProtectedName(member.name));

    }

    function sdpKeys(sdp) {
        var uf  = (sdp.match(/a=ice-ufrag:([^\r\n]+)/) || [])[1];
        var ses = (sdp.match(/o=-\s+(\d+)/)            || [])[1];
        return {
            uf: uf, ses: ses
        };

    }

    function myUid() {
        var el = document.querySelector('.micborder[id^="micborder"]');
        return el ? el.id.replace('micborder', '') : '';

    }

    function getMicSpeakers() {
        return [].slice.call(document.querySelectorAll('.micborder[id^="micborder"]')).map(function (m) {
            var nameEl = m.querySelector('.th-mic-name');
            return {
                uid : m.id.replace('micborder', ''),
                name: nameEl ? cleanName(nameEl.textContent) : ''

            };

        }).filter(function (s) {
            return s.uid;

        });

    }

    function getRoomMembers() {
        var map = {

        };
        [].slice.call(document.querySelectorAll('#users .uhtml.inroom')).forEach(function (u) {
            var cls = [].slice.call(u.classList).find(function (c) {
                return c.indexOf('uid') === 0;

            }) || '';
            var uid = cls.replace(/^uid/, '');
            var nm  = cleanName((u.innerText.trim().split('\n')[0] || '').trim());
            if (uid && nm) map[uid] = {
                uid: uid, name: nm
            };

        });
        getMicSpeakers().forEach(function (s) {
            if (!s.name) return;
            if (!map[s.uid]) map[s.uid] = {
                uid: s.uid, name: s.name
            };
            else if (!map[s.uid].name) map[s.uid].name = s.name;

        });
        var arr = [];
        for (var k in map) if (map.hasOwnProperty(k)) arr.push(map[k]);
        return arr;

    }

    function onMicNow() {
        try {
            return typeof IAmOnMic === 'function' && IAmOnMic() === true;

        }

        catch (e) {
            return false;

        }


    }

    window.__LOUNGE_WHO = function () {
        var fromUsers = [].slice.call(document.querySelectorAll('#users .uhtml.inroom')).map(function (u) {
            var cls = [].slice.call(u.classList).find(function (c) {
                return c.indexOf('uid') === 0;

            }) || '';
            return {
                uid: cls.replace(/^uid/, ''),
                name: cleanName((u.innerText.trim().split('\n')[0] || '').trim()),
                visible: u.offsetHeight > 0,
                display: getComputedStyle(u).display,
                classes: u.className

            };

        });
        var fromMic = getMicSpeakers();
        return {
            fromUsers: fromUsers,
            fromMic: fromMic,
            shown: getRoomMembers(),
            protectedNames: [].slice.call(PROTECTED_NAMES)

        };

    };
    var OrigPC = window.RTCPeerConnection;
    if (OrigPC && !OrigPC.__loungeHooked) {
        function PCHook() {
            var pc = new OrigPC(...arguments);
            PCS.add(pc);
            pc.addEventListener('negotiationneeded', function () {
                setTimeout(function () {
                    reapplyForPC(pc);

                }, 300);

            });
            pc.addEventListener('signalingstatechange', function () {
                if (pc.signalingState === 'stable') {
                    setTimeout(function () {
                        reapplyForPC(pc);

                    }, 200);

                }


            });
            pc.addEventListener('connectionstatechange', function () {
                if (['closed', 'failed', 'disconnected'].indexOf(pc.connectionState) > -1) {
                    PCS.delete(pc);
                    REG.forEach(function (rec, uid) {
                        if (rec.pc === pc) REG.delete(uid);

                    });
                    render();

                }


            });
            return pc;

        }

        PCHook.prototype = OrigPC.prototype;
        PCHook.__loungeHooked = true;
        window.RTCPeerConnection = PCHook;
        if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = PCHook;

    }

    function reapplyForPC(pc) {
        REG.forEach(function (rec, uid) {
            if (rec.pc !== pc) return;
            uid = String(uid || '');
            if (isProtectedUid(uid)) {
                blocked.delete(uid);
                applyBlock(uid, false);
                return;

            }

            var sender = (pc.getSenders ? pc.getSenders() : []).find(function (s) {
                return s.track && s.track.kind === 'audio';

            });
            if (sender) {
                if (!blocked.has(uid)) {
                    rec.sender = sender;
                    rec.origTrack = sender.track;

                }
                 else {
                    rec.sender = sender;

                }


            }

            if (blocked.has(uid)) applyBlock(uid, true);

        });

    }

    function tryHookEmit() {
        var sock = getSock();
        if (!sock || !sock[EMIT_KEY]) return false;
        if (sock[EMIT_KEY][HOOK_FLAG]) return true;
        var orig = sock[EMIT_KEY].bind(sock);
        function emitHook(event) {
            try {
                if (event === 'SEND_MIC_TIGERHOST_EVENT') {
                    var arg   = arguments[1];
                    var mjStr = arg && arg.data && arg.data.mj ? arg.data.mj : (arg && arg.mj);
                    if (mjStr) {
                        var mj = JSON.parse(mjStr);
                        if (mj.target && mj.sdp && mj.sdp.sdp) {
                            var k = sdpKeys(mj.sdp.sdp);
                            mapTargetToPC(mj.target, k.uf, k.ses, 0);

                        }


                    }


                }


            }
             catch (e) {

            }

            return orig.apply(null, arguments);

        }

        emitHook[HOOK_FLAG] = true;
        sock[EMIT_KEY] = emitHook;
        return true;

    }

    if (!tryHookEmit()) {
        var iv = setInterval(function () {
            if (tryHookEmit()) clearInterval(iv);

        }, 500);

    }

    function mapTargetToPC(uid, uf, ses, attempt) {
        attempt = attempt || 0;
        uid = String(uid || '');
        if (isProtectedUid(uid)) {
            blocked.delete(uid);

        }

        var done = false;
        PCS.forEach(function (pc) {
            if (done) return;
            var sdp = (pc.localDescription && pc.localDescription.sdp) || '';
            var hit = (uf && sdp.indexOf('ice-ufrag:' + uf) > -1) ||
            (ses && sdp.indexOf('o=- ' + ses) > -1);
            if (hit) {
                var sender = (pc.getSenders ? pc.getSenders() : []).find(function (s) {
                    return s.track && s.track.kind === 'audio';

                });
                pc.__loungeUid = uid;
                var prev = REG.get(uid);
                REG.set(uid, {
                    pc: pc,
                    sender: sender || (prev && prev.sender) || null,
                    origTrack: (sender && !blocked.has(uid)) ? sender.track
                    : (prev ? prev.origTrack : (sender ? sender.track : null))

                });
                if (isProtectedUid(uid)) {
                    blocked.delete(uid);
                    applyBlock(uid, false);

                }
                 else if (blocked.has(uid)) {
                    applyBlock(uid, true);

                }

                render();
                done = true;

            }


        });
        if (!done && attempt < 8) {
            setTimeout(function () {
                mapTargetToPC(uid, uf, ses, attempt + 1);

            }, 400);

        }


    }

    function applyBlock(uid, doBlock) {
        uid = String(uid || '');
        if (doBlock && isProtectedUid(uid)) {
            blocked.delete(uid);
            return false;

        }

        var rec = REG.get(uid);
        if (!rec || !rec.sender) return false;
        try {
            if (doBlock) {
                if (rec.sender.track) rec.origTrack = rec.sender.track;
                rec.sender.replaceTrack(null);

            }
             else {
                rec.sender.replaceTrack(rec.origTrack || null);

            }

            return true;

        }
         catch (e) {
            return false;

        }


    }

    function toggle(uid) {
        uid = String(uid || '');
        if (isProtectedUid(uid)) {
            blocked.delete(uid);
            applyBlock(uid, false);
            render();
            return;

        }

        if (blocked.has(uid)) {
            blocked.delete(uid);
            applyBlock(uid, false);

        }
         else {
            blocked.add(uid);
            applyBlock(uid, true);

        }

        render();

    }

    function clearAll() {
        [].slice.call(blocked).forEach(function (uid) {
            applyBlock(uid, false);

        });
        blocked.clear();
        render();

    }

    function isVisibleMenu(menu) {
        return menu && getComputedStyle(menu).display !== 'none' && menu.offsetHeight > 0;

    }

    function injectIntoMenu(menu) {
        if (!menu || !onMicNow()) return;
        if (menu.querySelector('.lounge-blk-open')) return;
        var b = document.createElement('i');
        b.className = 'lounge-blk-open btn btn-secondary th-mic-btn';
        b.style.display = 'block';
        b.textContent = 'الممنوعين من سماع صوتي';
        b.onclick = function (e) {
            e.stopPropagation();
            openPanel();

        };
        menu.appendChild(b);

    }

    function scanMenus() {
        if (!onMicNow()) return;
        var menus = document.querySelectorAll('.th-mic-menu, #blockpro');
        for (var i = 0;
        i < menus.length;
        i++) {
            if (isVisibleMenu(menus[i])) injectIntoMenu(menus[i]);

        }


    }

    var mo = new MutationObserver(function () {
        scanMenus();

    });
    mo.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']

    });
    setInterval(scanMenus, 400);
    var overlay, panel, listEl, open = false;
    function buildPanel() {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.style.cssText =
        'position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.35);' +
        'display:none;direction:rtl;font-family:inherit;';
        overlay.onclick = function (e) {
            if (e.target === overlay) closePanel();

        };
        panel = document.createElement('div');
        panel.style.cssText = [
        'position:absolute',
        'top:50%',
        'left:50%',
        'transform:translate(-50%,-50%)',
        'width:300px',
        'max-height:70vh',
        'overflow:auto',
        'border-radius:10px',
        'background:#ffffff',
        'box-shadow:0 12px 40px rgba(0,0,0,.3)',
        'border:1px solid #e3e3e3',
        'color:#333'
        ].join(';');
        var head = document.createElement('div');
        head.style.cssText =
        'display:flex;align-items:center;justify-content:space-between;' +
        'background:#dc3545;color:#fff;padding:10px 12px;font-weight:700;font-size:14px;';
        var ht = document.createElement('span');
        ht.textContent = 'الممنوعون من سماع صوتي';
        var rightBox = document.createElement('span');
        rightBox.style.cssText = 'display:flex;align-items:center;gap:10px;';
        var hr = document.createElement('span');
        hr.textContent = '↻';
        hr.title = 'تحديث القائمة';
        hr.style.cssText = 'cursor:pointer;font-size:16px;';
        hr.onclick = function (e) {
            e.stopPropagation();
            render();

        };
        var hx = document.createElement('span');
        hx.textContent = '✕';
        hx.style.cssText = 'cursor:pointer;font-size:16px;';
        hx.onclick = closePanel;
        rightBox.appendChild(hr);
        rightBox.appendChild(hx);
        head.appendChild(ht);
        head.appendChild(rightBox);
        var sub = document.createElement('div');
        sub.textContent = 'اختر من يُمنع من سماع صوتك أثناء وجودك على المايك';
        sub.style.cssText = 'font-size:11px;color:#777;padding:8px 12px 4px;';
        listEl = document.createElement('div');
        listEl.style.cssText = 'padding:6px 10px 10px;';
        var note = document.createElement('div');
        note.textContent = 'الأسماء المحمية لا تظهر في هذه القائمة';
        note.style.cssText = 'font-size:10px;color:#999;text-align:center;padding:0 0 10px;';
        panel.appendChild(head);
        panel.appendChild(sub);
        panel.appendChild(listEl);
        panel.appendChild(note);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

    }

    var refreshTimer = null;
    function openPanel() {
        if (!onMicNow()) return;
        buildPanel();
        open = true;
        overlay.style.display = 'block';
        render();
        if (refreshTimer) clearInterval(refreshTimer);
        refreshTimer = setInterval(function () {
            if (open) render();

        }, 700);

    }

    function closePanel() {
        open = false;
        if (refreshTimer) {
            clearInterval(refreshTimer);
            refreshTimer = null;

        }

        if (overlay) overlay.style.display = 'none';

    }

    function render() {
        if (!listEl) return;
        var me = myUid();
        var members = getRoomMembers().filter(function (m) {
            return String(m.uid || '') !== String(me || '') && !isProtectedName(m.name);

        });
        getRoomMembers().forEach(function (m) {
            if (isProtectedName(m.name) && blocked.has(String(m.uid))) {
                blocked.delete(String(m.uid));
                applyBlock(String(m.uid), false);

            }


        });
        listEl.innerHTML = '';
        if (!members.length) {
            listEl.innerHTML =
            '<div style="font-size:12px;color:#999;text-align:center;padding:10px;">' +
            'جارٍ تحميل الأعضاء... إن استمرت فارغة اضغط ↻</div>';
            return;

        }

        members.forEach(function (m) {
            var row = document.createElement('div');
            row.style.cssText =
            'display:flex;align-items:center;justify-content:space-between;gap:8px;' +
            'padding:8px;border-bottom:1px solid #f0f0f0;';
            var nm = document.createElement('span');
            nm.textContent = m.name || m.uid;
            nm.style.cssText =
            'font-size:13px;color:#333;white-space:nowrap;overflow:hidden;' +
            'text-overflow:ellipsis;max-width:175px;';
            var mapped = REG.has(m.uid);
            var isBlk  = blocked.has(m.uid);
            var tg = document.createElement('button');
            tg.textContent = isBlk ? 'ممنوع' : 'يسمع';
            tg.title = mapped ? '' : 'لم يُربط اتصاله الصوتي بعد، سيُطبَّق تلقائيًا عند جاهزيته';
            tg.style.cssText = [
            'cursor:pointer',
            'border:none',
            'border-radius:6px',
            'padding:5px 16px',
            'font-size:12px',
            'font-weight:700',
            isBlk ? 'background:#dc3545;color:#fff' : 'background:#e9ecef;color:#555',
            mapped ? '' : 'opacity:.5'
            ].join(';');
            tg.onclick = function () {
                toggle(m.uid);

            };
            row.appendChild(nm);
            row.appendChild(tg);
            listEl.appendChild(row);

        });

    }

    var isOn = false;
    setInterval(function () {
        var now = onMicNow();
        if (now && !isOn) {
            isOn = true;
            scanMenus();

        }
         else if (!now && isOn) {
            isOn = false;
            clearAll();
            closePanel();
            var btns = document.querySelectorAll('.lounge-blk-open');
            for (var i = 0;
            i < btns.length;
            i++) btns[i].remove();

        }

        if (isOn && open) render();

    }, 1000);
    window.__LOUNGE_BLK_DEBUG = function () {
        var mapped = [];
        REG.forEach(function (rec, uid) {
            var pc = rec.pc;
            var senders = (pc && pc.getSenders ? pc.getSenders() : []).map(function (s) {
                return s.track ? (s.track.kind + (s.track.enabled ? '' : ':disabled')) : 'NULL';

            });
            var recv = (pc && pc.getReceivers ? pc.getReceivers() : []).map(function (r) {
                return r.track ? r.track.kind : null;

            }).filter(Boolean);
            var member = getMemberByUid(uid);
            mapped.push({
                uid: uid,
                name: member ? member.name : '',
                protected: member ? isProtectedName(member.name) : false,
                connState: pc ? pc.connectionState : 'no-pc',
                signaling: pc ? pc.signalingState : '-',
                senderTracks: senders,
                receiving: recv,
                isBlocked: blocked.has(uid)

            });

        });
        return {
            onMic: onMicNow(),
            totalPCs: PCS.size,
            blocked: [].slice.call(blocked),
            protectedNames: [].slice.call(PROTECTED_NAMES),
            members: getRoomMembers().map(function (m) {
                return m.name + ' | ' + m.uid + (REG.has(m.uid) ? ' ✓' : ' ✗') + (isProtectedName(m.name) ? ' | محمي' : '');

            }),
            mapped: mapped

        };

    };
    console.log('✅ لاونج | ميزة الممنوعين من سماع صوتي جاهزة مع قائمة أسماء محمية. للفحص: __LOUNGE_BLK_DEBUG()');

})();



/* ==================================================
   8) الواجهة الخارجية ونافذة الدخول ومنتدى فكرة
   ==================================================
   تنبيه مهم:
   - هذا القسم حساس جدًا.
   - لا تغيّر التموضع أو CSS إلا عند الحاجة وبحذر.
   التعديل السريع:
   - BG_URL = صورة الواجهة الخارجية.
   - إحداثيات الأزرار موجودة داخل CSS variables.
   ================================================== */
(function () {
    'use strict';
    window.__LOUNGE_VERSION__ = 'V15.0';
    if (window.__LOUNGE_CLEAN_INTERFACE_V134__) return;
    window.__LOUNGE_CLEAN_INTERFACE_V134__ = true;
    var BG_URL = 'https://i.ibb.co/bRMgW3wV/T.png';
    var lastNoticeText = '';
    function isLoginPage() {
        return ['#l1', '#l2', '#l3'].some(function (selector) {
            var box = document.querySelector(selector);
            return box && !!box.querySelector('input,button');

        });

    }

    function getTabs() {
        var lists = document.querySelectorAll('ul.nav.nav-tabs, .nav.nav-tabs');
        for (var i = 0;
        i < lists.length;
        i++) {
            var list = lists[i];
            if (
            list.querySelector('a[href*="#l1"]') ||
            list.querySelector('a[href*="#l2"]') ||
            list.querySelector('a[href*="#l3"]')
            ) {
                return list;

            }


        }

        return lists[0] || null;

    }

    function getContent() {
        var l1 = document.querySelector('#l1');
        return (l1 && l1.closest('.tab-content')) || document.querySelector('.tab-content');

    }

    function normalizeTabText(value) {
        return String(value || '')
        .replace(/[ًٌٍَُِّْـ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    }

    function findMemberLoginTab() {
        var tabs = getTabs();
        if (!tabs) return null;
        var links = tabs.querySelectorAll('a');
        for (var i = 0;
        i < links.length;
        i++) {
            var txt = normalizeTabText(links[i].textContent);
            if (
            txt.indexOf('دخول الاعضاء') !== -1 ||
            txt.indexOf('دخول الأعضاء') !== -1
            ) {
                return links[i];

            }


        }

        return links.length > 1 ? links[1] : (links[0] || null);

    }

    function getTargetFromTab(link) {
        if (!link) return '';
        var target =
        link.getAttribute('data-target') ||
        link.getAttribute('href') ||
        '';
        if (target.indexOf('#') !== -1) {
            target = '#' + target.split('#').pop();

        }

        return target;

    }

    function findTabByTarget(target) {
        var tabs = getTabs();
        if (!tabs) return null;
        var links = tabs.querySelectorAll('a');
        for (var i = 0;
        i < links.length;
        i++) {
            var href = links[i].getAttribute('href') || '';
            var dataTarget = links[i].getAttribute('data-target') || '';
            if (
            href === target ||
            href.slice(-target.length) === target ||
            dataTarget === target
            ) {
                return links[i];

            }


        }

        return null;

    }

    function markOriginalElements() {
        var tabs = getTabs();
        var content = getContent();
        if (tabs) tabs.classList.add('lounge-v12-tabs');
        if (content) content.classList.add('lounge-v12-content');
        ['#l1', '#l2', '#l3'].forEach(function (selector) {
            var box = document.querySelector(selector);
            if (box) box.classList.add('lounge-v12-box');

        });
        document.querySelectorAll('#stealth,input#stealth').forEach(function (element) {
            element.classList.add('lounge-v12-stealth');

        });
        document.querySelectorAll('.th-stealth-btn,.fa-eye').forEach(function (element) {
            if (element.closest('#l1,#l2,#l3')) {
                element.classList.add('lounge-v12-eye');

            }


        });

    }

    function applyV125TabColor(link, isActive) {
        if (!link) return;
        if (isActive) {
            link.style.setProperty('background', 'linear-gradient(180deg,#59a8dc,#3f91c9,#2f7fb9)', 'important');
            link.style.setProperty('color', '#fff', 'important');
            link.style.setProperty('border-color', 'rgba(215,174,91,.55)', 'important');
            link.style.setProperty('box-shadow', 'inset 0 1px 0 rgba(255,255,255,.48), 0 3px 10px rgba(55,125,172,.20)', 'important');
            link.style.setProperty('text-shadow', '0 1px 1px rgba(22,75,112,.28)', 'important');

        }
         else {
            link.style.setProperty('background', 'linear-gradient(180deg,#ffffff,#edf5fa)', 'important');
            link.style.setProperty('color', '#486a80', 'important');
            link.style.setProperty('border-color', 'rgba(111,168,202,.42)', 'important');
            link.style.setProperty('box-shadow', 'inset 0 1px 0 rgba(255,255,255,.9), 0 2px 7px rgba(82,138,172,.10)', 'important');
            link.style.removeProperty('text-shadow');

        }


    }

    function syncActiveTab(forceTarget) {
        var tabs = getTabs();
        if (!tabs) return;
        var links = tabs.querySelectorAll('a');
        var target = forceTarget || '';
        if (!target) {
            var expandedLink = tabs.querySelector('a[aria-expanded="true"]');
            var activeLink = expandedLink || tabs.querySelector('li.active a, a.active, a.lounge-tab-active-v12, a.lounge-tab-active-v13');
            target = getTargetFromTab(activeLink);
            if (!target) {
                target = getTargetFromTab(findMemberLoginTab());

            }


        }

        links.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            var dataTarget = link.getAttribute('data-target') || '';
            var isActive =
            href === target ||
            (target && href.slice(-target.length) === target) ||
            dataTarget === target;
            link.classList.toggle('lounge-tab-active-v12', isActive);
            applyV125TabColor(link, isActive);
            var li = link.closest('li');
            if (li) {
                li.classList.toggle('lounge-tab-active-v12', isActive);

            }


        });

    }

    function forceMemberTabVisualState() {
        var tabs = getTabs();
        var memberTab = findMemberLoginTab();
        if (!tabs || !memberTab) return;
        var links = tabs.querySelectorAll('a');
        links.forEach(function (link) {
            var active = link === memberTab;
            link.classList.toggle('lounge-tab-active-v13', active);
            applyV125TabColor(link, active);
            var li = link.closest('li');
            if (li) {
                li.classList.toggle('lounge-tab-active-v13', active);
                li.classList.toggle('active', active);

            }


        });

    }

    function activateMemberLogin() {
        var memberTab = findMemberLoginTab();
        if (!memberTab) {
            syncActiveTab();
            return;

        }

        var target = getTargetFromTab(memberTab);
        try {
            memberTab.click();

        }
         catch (error) {

        }

        if (target) syncActiveTab(target);
        forceMemberTabVisualState();
        setTimeout(function () {
            if (target) syncActiveTab(target);
            forceMemberTabVisualState();

        }, 80);
        setTimeout(function () {
            if (target) syncActiveTab(target);
            forceMemberTabVisualState();

        }, 220);

    }

    function syncEyeState() {
        var stealth =
        document.getElementById('stealth') ||
        document.querySelector('.lounge-v12-stealth');
        var isOn = !!(stealth && stealth.checked);
        document.querySelectorAll('.lounge-v12-eye,.th-stealth-btn').forEach(function (element) {
            if (!element.closest('#l1,#l2,#l3')) return;
            element.classList.toggle('is-on', isOn);
            element.setAttribute(
            'title',
            isOn ? 'الدخول المخفي مفعل' : 'الدخول المخفي غير مفعل'
            );

        });

    }

    function bindEyeEvents() {
        document.querySelectorAll('.lounge-v12-eye,.th-stealth-btn').forEach(function (element) {
            if (!element.closest('#l1,#l2,#l3')) return;
            if (element.dataset.v12Bound === '1') return;
            element.dataset.v12Bound = '1';
            element.addEventListener('click', function () {
                setTimeout(syncEyeState, 40);
                setTimeout(syncEyeState, 160);

            });

        });
        var stealth =
        document.getElementById('stealth') ||
        document.querySelector('.lounge-v12-stealth');
        if (stealth && stealth.dataset.v12Bound !== '1') {
            stealth.dataset.v12Bound = '1';
            stealth.addEventListener('change', syncEyeState);
            stealth.addEventListener('click', function () {
                setTimeout(syncEyeState, 40);

            });

        }


    }

    function cleanText(value) {
        return String(value || '')
        .replace(/\s+/g, ' ')
        .trim();

    }

    var loginNoticeCaptureUntil = 0;
    var loginNoticeAction = '';
    function beginLoginNoticeCapture(action) {
        loginNoticeAction = action || '';
        loginNoticeCaptureUntil = Date.now() + 10000;
        lastNoticeText = '';

    }

    function isLoginCaptureActive() {
        return Date.now() <= loginNoticeCaptureUntil;

    }

    function isLoginSystemNotice(text) {
        var t = cleanText(text);
        if (!t || t.length < 3 || t.length > 260) return false;
        var exactPhrases = [
        'اسم المستخدم أو كلمة المرور',
        'اسم المستخدم وكلمة المرور',
        'اسم المستخدم غير صحيح',
        'كلمة المرور غير صحيحة',
        'كلمة المرور خاطئة',
        'الباسورد غير صحيح',
        'بيانات الدخول غير صحيحة',
        'بيانات الدخول خاطئة',
        'المستخدم غير موجود',
        'هذا المستخدم غير موجود',
        'هذا الاسم غير مسجل',
        'هذا الإسم غير مسجل',
        'الاسم غير مسجل',
        'الإسم غير مسجل',
        'تعذر تسجيل الدخول',
        'فشل تسجيل الدخول',
        'يرجى التأكد من اسم المستخدم',
        'تسجيل العضويات مغلق',
        'تسجيل العضوية مغلق',
        'التسجيل مغلق',
        'التسجيل غير متاح',
        'دخول الزوار مغلق',
        'دخول الزوار غير متاح',
        'تم تعطيل دخول الزوار',
        'الزوار غير متاحين',
        'لا يمكن دخول الزوار',
        'الحساب موقوف',
        'العضوية موقوفة'
        ];
        for (var i = 0;
        i < exactPhrases.length;
        i++) {
            if (t.indexOf(exactPhrases[i]) !== -1) return true;

        }

        return false;

    }

    function showNotice(text) {
        var notice = document.getElementById('loungeUnifiedNoticeV12');
        if (!notice) return;
        var cleaned = cleanText(text);
        if (!cleaned || cleaned === lastNoticeText) return;
        lastNoticeText = cleaned;
        notice.textContent = cleaned;
        notice.classList.add('is-visible');
        setTimeout(function () {
            notice.classList.remove('is-visible');

        }, 9000);

    }

    function hideOriginalSystemMessage(element) {
        if (!element || element.id === 'loungeUnifiedNoticeV12') return;
        try {
            element.setAttribute('data-lounge-system-message-hidden', '1');
            element.style.setProperty('display', 'none', 'important');
            element.style.setProperty('visibility', 'hidden', 'important');
            element.style.setProperty('opacity', '0', 'important');
            element.style.setProperty('pointer-events', 'none', 'important');
            element.style.setProperty('height', '0', 'important');
            element.style.setProperty('min-height', '0', 'important');
            element.style.setProperty('max-height', '0', 'important');
            element.style.setProperty('margin', '0', 'important');
            element.style.setProperty('padding', '0', 'important');
            element.style.setProperty('overflow', 'hidden', 'important');

        }
         catch (error) {

        }


    }

    var LOGIN_NOTICE_SELECTOR =
    '.alert,.alert-danger,.alert-warning,.alert-info,' +
    '.toast,.swal2-popup,[role="alert"],.hand.corner.nosel,' +
    '.noty_bar,.noty_body,.iziToast,.iziToast-text';
    function addNoticeCandidate(list, element) {
        if (!element || element.nodeType !== 1) return;
        if (list.indexOf(element) === -1) list.push(element);

    }

    function scanForSystemMessages(root) {
        if (!isLoginCaptureActive()) return;
        var scope = null;
        if (root && root.nodeType === 3) scope = root.parentElement;
        else if (root && root.nodeType === 1) scope = root;
        if (!scope) return;
        var candidates = [];
        var current = scope;
        for (var broadDepth = 0;
        current && broadDepth < 7;
        broadDepth++, current = current.parentElement) {
            if (
            current.id !== 'loungeUnifiedNoticeV12' &&
            !(current.closest && current.closest('#loungeUnifiedShellV12'))
            ) {
                var broadText = cleanText(current.textContent);
                if (isLoginSystemNotice(broadText)) {
                    showNotice(broadText);
                    hideOriginalSystemMessage(current);
                    return;

                }


            }


        }

        current = scope;
        for (var depth = 0;
        current && depth < 6;
        depth++, current = current.parentElement) {
            if (current.matches && current.matches(LOGIN_NOTICE_SELECTOR)) {
                addNoticeCandidate(candidates, current);
                break;

            }


        }

        if (scope.matches && scope.matches(LOGIN_NOTICE_SELECTOR)) {
            addNoticeCandidate(candidates, scope);

        }

        if (scope.querySelectorAll) {
            Array.prototype.slice.call(scope.querySelectorAll(LOGIN_NOTICE_SELECTOR))
            .forEach(function (element) {
                addNoticeCandidate(candidates, element);

            });

        }

        candidates.forEach(function (element) {
            if (
            element.id === 'loungeUnifiedNoticeV12' ||
            element.closest('#loungeUnifiedShellV12')
            ) {
                return;

            }

            var text = cleanText(element.textContent);
            if (isLoginSystemNotice(text)) {
                showNotice(text);
                hideOriginalSystemMessage(element);

            }


        });

    }

    var lastLoginStatTextV134 = '';
    function scanLoginStatV134() {
        if (!isLoginCaptureActive()) return;
        var stat = document.getElementById('loginstat');
        if (!stat) return;
        var text = cleanText(stat.textContent);
        if (!text || text === lastLoginStatTextV134) return;
        var isWarning = stat.classList.contains('label-warning') ||
        stat.classList.contains('label-danger') ||
        stat.classList.contains('label-error');
        if (isWarning || isLoginSystemNotice(text)) {
            lastLoginStatTextV134 = text;
            showNotice(text);

        }


    }

    function bindLoginStatObserverV134() {
        var stat = document.getElementById('loginstat');
        if (!stat || stat.dataset.loungeV134Observed === '1') return;
        stat.dataset.loungeV134Observed = '1';
        lastLoginStatTextV134 = cleanText(stat.textContent);
        new MutationObserver(function () {
            scanLoginStatV134();

        }).observe(stat, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['class']

        });

    }

    function scanLoginNoticesNow() {
        bindLoginStatObserverV134();
        scanLoginStatV134();
        ['#l1','#l2','#l3','#regstat','.regstat','[id*="regstat"]','[class*="regstat"]'].forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (element) {
                var text = cleanText(element.textContent);
                if (isLoginSystemNotice(text)) {
                    showNotice(text);
                    if (!element.matches('#l1,#l2,#l3')) {
                        hideOriginalSystemMessage(element);

                    }


                }


            });

        });
        scanForSystemMessages(document.body);

    }

    function scheduleLoginNoticeScan(action) {
        beginLoginNoticeCapture(action);
        lastLoginStatTextV134 = '';
        bindLoginStatObserverV134();
        [20, 50, 100, 180, 320, 550, 900, 1400, 2200, 3500, 5000, 7500].forEach(function (delay) {
            setTimeout(scanLoginNoticesNow, delay);

        });

    }

    var registrationFallbackTimerV144 = null;
    function isRegistrationTextV144(value) {
        var t = normalizeTabText(value);
        return t.indexOf('تسجيل') !== -1 || t.indexOf('عضوية') !== -1 || t.indexOf('عضويه') !== -1;

    }

    function scheduleRegistrationClosedFallbackV144(source) {
        clearTimeout(registrationFallbackTimerV144);
        var noticeBefore = lastNoticeText;
        registrationFallbackTimerV144 = setTimeout(function () {
            if (!document.body.classList.contains('lounge-login-modal-open-v12')) return;
            if (lastNoticeText && lastNoticeText !== noticeBefore) return;
            scanLoginNoticesNow();
            setTimeout(function () {
                if (!document.body.classList.contains('lounge-login-modal-open-v12')) return;
                if (lastNoticeText && lastNoticeText !== noticeBefore) return;
                showNotice('تسجيل العضوية مغلق حاليًا');

            }, 120);

        }, 650);

    }

    if (!window.__LOUNGE_LOGIN_ALERT_HOOK_V134__) {
        window.__LOUNGE_LOGIN_ALERT_HOOK_V134__ = true;
        var loungeOriginalAlertV134 = window.alert;
        window.alert = function (message) {
            var text = cleanText(message);
            var modalOpen = document.body && document.body.classList.contains('lounge-login-modal-open-v12');
            if (modalOpen && isLoginCaptureActive()) {
                if (text && text.length <= 260) {
                    showNotice(text);
                    return;

                }


            }

            return loungeOriginalAlertV134.apply(window, arguments);

        };

    }

    function bindTabEvents() {
        var tabs = getTabs();
        if (!tabs || tabs.dataset.v12Bound === '1') return;
        tabs.dataset.v12Bound = '1';
        tabs.addEventListener('click', function (event) {
            var link = event.target.closest('a');
            if (!link) return;
            var target =
            link.getAttribute('data-target') ||
            link.getAttribute('href') ||
            '#l1';
            if (target.indexOf('#') !== -1) {
                target = '#' + target.split('#').pop();

            }

            beginLoginNoticeCapture(target || 'tab');
            if (isRegistrationTextV144(link.textContent)) {
                scheduleRegistrationClosedFallbackV144('registration-tab');

            }

            setTimeout(function () {
                syncActiveTab(target);
                scanLoginNoticesNow();

            }, 30);
            setTimeout(function () {
                syncActiveTab(target);

            }, 180);

        });
        var v125SyncQueued = false;
        new MutationObserver(function () {
            if (v125SyncQueued) return;
            v125SyncQueued = true;
            requestAnimationFrame(function () {
                v125SyncQueued = false;
                syncActiveTab();

            });

        }).observe(tabs, {
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-expanded', 'class']

        });
        syncActiveTab();

    }

    function injectStyle() {
        if (document.getElementById('loungeUnifiedV123Style')) return;
        var css = `
<style id="loungeUnifiedV123Style">
body.lounge-unified-v12{
margin:0!important;
background:#000!important;
overflow:hidden!important;
}
#loungeInterfaceBackdropV13{
position:fixed!important;
inset:0!important;
z-index:2147482000!important;
background:#000!important;
overflow-x:hidden!important;
overflow-y:auto!important;
-webkit-overflow-scrolling:touch!important;
}
#loungeDesignCanvasV13{
--lounge-button-left:62.222222%; /* 672 / 1080 */
--lounge-button-top:46.880570%;  /* 1052 / 2244 */
--lounge-button-width:28.333333%;/* 306 / 1080 */
--lounge-button-height:4.857398%; /* 109 / 2244 */
--lounge-forum-left:62.222222%;  /* 672 / 1080 */
--lounge-forum-top:52.807487%;   /* 1185 / 2244 */
--lounge-forum-width:28.333333%; /* 306 / 1080 */
--lounge-forum-height:4.055258%; /* 91 / 2244 */
--lounge-forum-menu-left:51.8%; /* 538 / 1080 — V14.7 تثبيت يمين القائمة عند يمين زر المنتدى */
--lounge-forum-menu-top:57.397504%;  /* 1288 / 2244 — تبقى تحت زر المنتدى */
--lounge-forum-menu-width:40.740741%;/* 440 / 1080 — V14.7 زيادة العرض لليسار فقط */
position:relative!important;
top:0!important;
left:auto!important;
transform:none!important;
width:min(416px,100vw)!important;
aspect-ratio:1080 / 2244!important;
margin:0 auto!important;
background:#000 url("${BG_URL}") center top/100% 100% no-repeat!important;
overflow:hidden!important;
}
#loungeUnifiedOpenV12{
position:absolute!important;
left:var(--lounge-button-left)!important;
top:var(--lounge-button-top)!important;
width:var(--lounge-button-width)!important;
min-width:0!important;
height:var(--lounge-button-height)!important;
min-height:40px!important;
padding:0!important;
transform:none!important;
z-index:2!important;
border:0!important;
border-radius:999px!important;
background:transparent!important;
color:transparent!important;
font-size:0!important;
text-shadow:none!important;
cursor:pointer!important;
pointer-events:auto!important;
box-shadow:none!important;
outline:none!important;
-webkit-tap-highlight-color:transparent!important;
box-sizing:border-box!important;
}
#loungeForumOpenV145{
position:absolute!important;
left:var(--lounge-forum-left)!important;
top:var(--lounge-forum-top)!important;
width:var(--lounge-forum-width)!important;
min-width:0!important;
height:var(--lounge-forum-height)!important;
min-height:34px!important;
padding:0!important;
transform:none!important;
z-index:3!important;
border:0!important;
border-radius:999px!important;
background:transparent!important;
color:transparent!important;
font-size:0!important;
text-shadow:none!important;
cursor:pointer!important;
pointer-events:auto!important;
box-shadow:none!important;
outline:none!important;
-webkit-tap-highlight-color:transparent!important;
box-sizing:border-box!important;
}
#loungeForumMenuV145{
position:absolute!important;
left:var(--lounge-forum-menu-left)!important;
top:var(--lounge-forum-menu-top)!important;
width:var(--lounge-forum-menu-width)!important;
min-width:0!important;
z-index:4!important;
display:none!important;
direction:rtl!important;
padding:3.2% 3.1% 3.55%!important;
box-sizing:border-box!important;
border-radius:8.6% / 7.2%!important;
background:linear-gradient(180deg,rgba(255,255,255,.88),rgba(245,250,252,.78))!important;
border:1px solid rgba(210,166,83,.70)!important;
box-shadow:0 10px 28px rgba(54,105,137,.19),inset 0 1px 0 rgba(255,255,255,.82)!important;
backdrop-filter:blur(5px)!important;
-webkit-backdrop-filter:blur(5px)!important;
}
#loungeForumMenuV145:before{
content:''!important;
position:absolute!important;
inset:1.8%!important;
border-radius:8% / 6.7%!important;
border:1px solid rgba(255,255,255,.66)!important;
pointer-events:none!important;
}
#loungeForumMenuV145.is-open{
display:block!important;
animation:loungeForumDropV145 .18s ease-out both!important;
}
@keyframes loungeForumDropV145{
from{opacity:0;transform:translateY(-5px) scale(.985);}
to{opacity:1;transform:translateY(0) scale(1);}
}
#loungeForumMenuV145 a{
position:relative!important;
z-index:1!important;
display:flex!important;
align-items:center!important;
justify-content:flex-start!important;
gap:6px!important;
width:100%!important;
min-height:33px!important;
height:auto!important;
margin:4px 0!important;
padding:7px 12px 7px 10px!important;
box-sizing:border-box!important;
border-radius:999px!important;
background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(243,248,250,.52))!important;
border:1px solid rgba(255,255,255,.62)!important;
color:#4f3d2d!important;
font-size:12px!important;
font-weight:800!important;
line-height:1.45!important;
text-decoration:none!important;
text-align:right!important;
direction:rtl!important;
white-space:nowrap!important;
overflow:hidden!important;
text-overflow:ellipsis!important;
box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 2px 7px rgba(80,122,148,.08)!important;
}
#loungeForumMenuV145 a:before{
content:'✤'!important;
flex:0 0 auto!important;
color:#c99b42!important;
font-size:13px!important;
line-height:1!important;
text-shadow:0 1px 0 rgba(255,255,255,.85),0 0 5px rgba(201,155,66,.20)!important;
}
@media(max-width:520px){
#loungeForumMenuV145 a{
font-size:11px!important;
line-height:1.25!important;
min-height:31px!important;
padding:6px 9px!important;
gap:5px!important;
white-space:nowrap!important;
overflow:hidden!important;
text-overflow:ellipsis!important;
}
#loungeForumMenuV145 a:before{
font-size:12px!important;
}
}
#loungeForumMenuV145 a:hover{
color:#2f7fb9!important;
background:linear-gradient(180deg,rgba(255,255,255,.88),rgba(237,247,252,.72))!important;
border-color:rgba(206,160,72,.38)!important;
}
body.lounge-login-modal-open-v12 #loungeForumOpenV145,
body.lounge-login-modal-open-v12 #loungeForumMenuV145{
display:none!important;
pointer-events:none!important;
}
#loungeUnifiedOverlayV12{
position:fixed!important;
inset:0!important;
z-index:2147483500!important;
display:none!important;
background:rgba(51,82,101,.38)!important;
backdrop-filter:blur(3px)!important;
-webkit-backdrop-filter:blur(3px)!important;
}
#loungeUnifiedShellV12{
position:fixed!important;
top:50%!important;
left:50%!important;
transform:translate(-50%,-50%)!important;
z-index:2147483600!important;
width:360px!important;
max-width:calc(100vw - 24px)!important;
height:390px!important;
border-radius:18px!important;
background:linear-gradient(180deg,rgba(255,255,255,.985),rgba(235,246,252,.985))!important;
border:1px solid rgba(204,166,91,.58)!important;
box-shadow:0 18px 55px rgba(52,103,136,.34),inset 0 1px 0 rgba(255,255,255,.95)!important;
display:none!important;
direction:rtl!important;
}
body.lounge-login-modal-open-v12 #loungeUnifiedOverlayV12,
body.lounge-login-modal-open-v12 #loungeUnifiedShellV12{
display:block!important;
}
#loungeUnifiedCloseV12{
position:absolute!important;
top:10px!important;
left:10px!important;
width:30px!important;
height:30px!important;
border-radius:50%!important;
border:1px solid rgba(70,145,194,.34)!important;
background:rgba(255,255,255,.76)!important;
color:#347fae!important;
font-size:18px!important;
line-height:28px!important;
text-align:center!important;
cursor:pointer!important;
z-index:3!important;
}
#loungeUnifiedTitleV12{
position:absolute!important;
top:14px!important;
right:48px!important;
left:48px!important;
color:#356f95!important;
font-size:17px!important;
font-weight:900!important;
text-align:center!important;
}
#loungeUnifiedNoticeV12{
position:absolute!important;
top:54px!important;
right:16px!important;
left:16px!important;
z-index:5!important;
min-height:0!important;
max-height:0!important;
overflow:hidden!important;
padding:0 12px!important;
border-radius:9px!important;
background:linear-gradient(180deg,rgba(73,155,207,.97),rgba(46,119,168,.97))!important;
color:#fff!important;
border:1px solid rgba(217,177,94,.62)!important;
font-size:12px!important;
font-weight:800!important;
line-height:1.7!important;
text-align:center!important;
opacity:0!important;
transform:translateY(-5px)!important;
transition:all .2s ease!important;
box-sizing:border-box!important;
}
#loungeUnifiedNoticeV12.is-visible{
max-height:90px!important;
padding:8px 12px!important;
opacity:1!important;
transform:translateY(0)!important;
}
body.lounge-unified-v12:not(.lounge-login-modal-open-v12) .lounge-v12-tabs,
body.lounge-unified-v12:not(.lounge-login-modal-open-v12) .lounge-v12-content{
position:fixed!important;
left:-9999px!important;
top:-9999px!important;
width:1px!important;
height:1px!important;
overflow:hidden!important;
visibility:hidden!important;
opacity:0!important;
pointer-events:none!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-tabs{
position:fixed!important;
top:calc(50% - 48px)!important;
left:50%!important;
transform:translateX(-50%)!important;
z-index:2147483700!important;
width:328px!important;
min-width:328px!important;
max-width:328px!important;
height:38px!important;
display:grid!important;
grid-template-columns:repeat(3,1fr)!important;
gap:8px!important;
margin:0!important;
padding:0!important;
border:0!important;
background:transparent!important;
list-style:none!important;
overflow:visible!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li{
display:block!important;
width:100%!important;
min-width:0!important;
max-width:100%!important;
margin:0!important;
padding:0!important;
float:none!important;
background:transparent!important;
border:0!important;
box-shadow:none!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li > a{
width:100%!important;
min-width:0!important;
max-width:100%!important;
min-height:36px!important;
height:36px!important;
padding:6px 4px!important;
margin:0!important;
display:flex!important;
align-items:center!important;
justify-content:center!important;
border-radius:999px!important;
border:1px solid rgba(255,255,255,.16)!important;
background:linear-gradient(180deg,#ffffff,#edf6fb)!important;
color:#4a6f86!important;
font-size:12px!important;
font-weight:800!important;
text-decoration:none!important;
white-space:nowrap!important;
box-sizing:border-box!important;
box-shadow:none!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li.lounge-tab-active-v12 > a,
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li > a.lounge-tab-active-v12,
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li.lounge-tab-active-v13 > a,
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li > a.lounge-tab-active-v13,
body.lounge-login-modal-open-v12 .lounge-v12-tabs > li.active > a{
background:linear-gradient(180deg,#59a8dc,#3f91c9,#2f7fb9)!important;
color:#fff!important;
border-color:rgba(215,174,91,.58)!important;
box-shadow:0 0 0 1px rgba(255,255,255,.35),0 6px 14px rgba(55,125,172,.24)!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-content{
position:fixed!important;
top:calc(50% + 2px)!important;
left:50%!important;
transform:translateX(-50%)!important;
z-index:2147483700!important;
width:328px!important;
min-width:328px!important;
max-width:328px!important;
min-height:165px!important;
margin:0!important;
padding:0!important;
background:transparent!important;
border:0!important;
box-shadow:none!important;
visibility:visible!important;
opacity:1!important;
pointer-events:auto!important;
overflow:visible!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-box{
position:static!important;
width:100%!important;
max-width:none!important;
min-width:0!important;
height:auto!important;
margin:0!important;
padding:0!important;
background:transparent!important;
border:0!important;
box-shadow:none!important;
direction:rtl!important;
overflow:visible!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-content input:not([type="checkbox"]),
body.lounge-login-modal-open-v12 .lounge-v12-content .form-control{
display:block!important;
width:100%!important;
height:38px!important;
min-height:38px!important;
margin:6px 0!important;
padding:0 10px!important;
box-sizing:border-box!important;
background:rgba(255,255,255,.88)!important;
color:#355568!important;
border:1px solid rgba(87,157,201,.38)!important;
border-radius:9px!important;
outline:none!important;
box-shadow:none!important;
font-size:14px!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-content button.btn-primary,
body.lounge-login-modal-open-v12 .lounge-v12-content button.btn.btn-primary{
width:100%!important;
min-width:0!important;
height:40px!important;
line-height:40px!important;
margin:8px 0 0!important;
padding:0 14px!important;
border-radius:999px!important;
border:1px solid rgba(214,173,88,.62)!important;
background:linear-gradient(180deg,#5eaddf,#3f91c9,#347fae)!important;
color:#fff!important;
font-size:14px!important;
font-weight:900!important;
text-shadow:none!important;
box-shadow:0 5px 14px rgba(54,126,173,.27),inset 0 1px 0 rgba(255,255,255,.35)!important;
}
body.lounge-unified-v12 .lounge-v12-stealth,
body.lounge-unified-v12 #stealth,
body.lounge-unified-v12 input#stealth,
body.lounge-unified-v12 .lounge-v12-content input[type="checkbox"]{
display:none!important;
visibility:hidden!important;
opacity:0!important;
width:0!important;
height:0!important;
min-width:0!important;
min-height:0!important;
margin:0!important;
padding:0!important;
border:0!important;
position:absolute!important;
left:-9999px!important;
pointer-events:none!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-eye,
body.lounge-login-modal-open-v12 .th-stealth-btn{
display:inline-flex!important;
align-items:center!important;
justify-content:center!important;
width:34px!important;
height:34px!important;
line-height:34px!important;
margin:4px 8px 0 0!important;
padding:0!important;
color:#3f91c9!important;
background:rgba(255,255,255,.82)!important;
border:1px solid rgba(63,145,201,.36)!important;
border-radius:50%!important;
font-size:16px!important;
opacity:.92!important;
visibility:visible!important;
pointer-events:auto!important;
text-shadow:0 0 6px rgba(63,145,201,.28)!important;
box-shadow:0 0 10px rgba(63,145,201,.15)!important;
transition:all .18s ease!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-eye.is-on,
body.lounge-login-modal-open-v12 .th-stealth-btn.is-on{
color:#b5852f!important;
background:rgba(232,247,255,.96)!important;
border-color:rgba(204,158,67,.74)!important;
box-shadow:0 0 0 1px rgba(255,255,255,.55),0 0 18px rgba(63,145,201,.34)!important;
transform:scale(1.08)!important;
}
@media(min-width:521px){
#loungeInterfaceBackdropV13{
overflow:hidden!important;
}
#loungeDesignCanvasV13{
position:absolute!important;
top:0!important;
left:50%!important;
transform:translateX(-50%)!important;
width:max(416px,calc(100dvh * 1080 / 2244))!important;
height:auto!important;
aspect-ratio:1080 / 2244!important;
margin:0!important;
}
}
@media(max-width:520px){
#loungeUnifiedShellV12{
width:calc(100vw - 28px)!important;
max-width:380px!important;
height:400px!important;
border-radius:16px!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-tabs{
width:calc(100vw - 88px)!important;
min-width:0!important;
max-width:340px!important;
top:calc(50% - 54px)!important;
gap:8px!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-content{
width:calc(100vw - 56px)!important;
min-width:0!important;
max-width:340px!important;
top:calc(50% - 4px)!important;
}
body.lounge-login-modal-open-v12 .lounge-v12-eye,
body.lounge-login-modal-open-v12 .th-stealth-btn{
width:38px!important;
height:38px!important;
line-height:38px!important;
font-size:18px!important;
margin-right:8px!important;
}
}
</style>`;
        document.head.insertAdjacentHTML('beforeend', css);

    }

    function buildInterfaceStage() {
        var backdrop = document.getElementById('loungeInterfaceBackdropV13');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'loungeInterfaceBackdropV13';
            document.body.appendChild(backdrop);

        }

        var canvas = document.getElementById('loungeDesignCanvasV13');
        if (!canvas) {
            canvas = document.createElement('div');
            canvas.id = 'loungeDesignCanvasV13';
            backdrop.appendChild(canvas);

        }

        return canvas;

    }

    function buildShell() {
        if (!document.getElementById('loungeUnifiedOverlayV12')) {
            var overlay = document.createElement('div');
            overlay.id = 'loungeUnifiedOverlayV12';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeModal);

        }

        if (!document.getElementById('loungeUnifiedShellV12')) {
            var shell = document.createElement('div');
            shell.id = 'loungeUnifiedShellV12';
            shell.innerHTML =
            '<button type="button" id="loungeUnifiedCloseV12">×</button>' +
            '<div id="loungeUnifiedTitleV12">الدخول إلى شات لاونج</div>' +
            '<div id="loungeUnifiedNoticeV12"></div>';
            document.body.appendChild(shell);
            shell.addEventListener('click', function (event) {
                event.stopPropagation();

            });
            document
            .getElementById('loungeUnifiedCloseV12')
            .addEventListener('click', closeModal);

        }


    }

    function ensureButton() {
        if (document.getElementById('loungeUnifiedOpenV12')) return;
        var canvas = buildInterfaceStage();
        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'loungeUnifiedOpenV12';
        button.textContent = 'دخول';
        button.addEventListener('click', openModal);
        canvas.appendChild(button);

    }

    function ensureForumFekraV145() {
        var canvas = buildInterfaceStage();
        if (!document.getElementById('loungeForumOpenV145')) {
            var forumButton = document.createElement('button');
            forumButton.type = 'button';
            forumButton.id = 'loungeForumOpenV145';
            forumButton.textContent = 'منتدى فكرة';
            forumButton.setAttribute('aria-label', 'فتح مواضيع منتدى فكرة');
            forumButton.setAttribute('aria-expanded', 'false');
            forumButton.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                toggleForumFekraV145();

            });
            canvas.appendChild(forumButton);

        }

        if (!document.getElementById('loungeForumMenuV145')) {
            var menu = document.createElement('div');
            menu.id = 'loungeForumMenuV145';
            menu.setAttribute('aria-label', 'مواضيع منتدى فكرة');
            menu.innerHTML =
            '<a href="https://loungesa7.freeforums.net/thread/171/" target="_blank" rel="noopener noreferrer">بين ألم الفقد ووداع الأحبة</a>' +
            '<a href="https://loungesa7.freeforums.net/thread/174" target="_blank" rel="noopener noreferrer">بيت فوق غيمة</a>' +
            '<a href="https://loungesa7.freeforums.net/thread/161" target="_blank" rel="noopener noreferrer">مع نفسك</a>';
            menu.addEventListener('click', function (event) {
                event.stopPropagation();

            });
            canvas.appendChild(menu);

        }


    }

    function closeForumFekraV145() {
        var menu = document.getElementById('loungeForumMenuV145');
        var button = document.getElementById('loungeForumOpenV145');
        if (menu) menu.classList.remove('is-open');
        if (button) button.setAttribute('aria-expanded', 'false');

    }

    function toggleForumFekraV145() {
        if (document.body.classList.contains('lounge-login-modal-open-v12')) return;
        var menu = document.getElementById('loungeForumMenuV145');
        var button = document.getElementById('loungeForumOpenV145');
        if (!menu || !button) return;
        var isOpen = menu.classList.toggle('is-open');
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    }

    function openModal() {
        closeForumFekraV145();
        markOriginalElements();
        bindTabEvents();
        bindEyeEvents();
        syncEyeState();
        lastNoticeText = '';
        var notice = document.getElementById('loungeUnifiedNoticeV12');
        if (notice) {
            notice.textContent = '';
            notice.classList.remove('is-visible');

        }

        document.body.classList.add('lounge-login-modal-open-v12');
        activateMemberLogin();
        forceMemberTabVisualState();

    }

    function closeModal() {
        document.body.classList.remove('lounge-login-modal-open-v12');

    }

    function setup() {
        if (!document.body) return;
        markOriginalElements();
        bindTabEvents();
        bindEyeEvents();
        syncEyeState();
        bindLoginStatObserverV134();
        if (isLoginPage()) {
            document.body.classList.add('lounge-unified-v12');
            injectStyle();
            buildInterfaceStage();
            buildShell();
            ensureButton();
            ensureForumFekraV145();

        }
         else {
            document.body.classList.remove('lounge-unified-v12');
            document.body.classList.remove('lounge-login-modal-open-v12');
            var stage = document.getElementById('loungeInterfaceBackdropV13');
            if (stage) stage.remove();
            var overlay = document.getElementById('loungeUnifiedOverlayV12');
            if (overlay) overlay.remove();
            var shell = document.getElementById('loungeUnifiedShellV12');
            if (shell) shell.remove();

        }


    }

    document.addEventListener('click', function (event) {
        var target = event.target;
        if (
        target &&
        target.closest &&
        (target.closest('#loungeForumOpenV145') || target.closest('#loungeForumMenuV145'))
        ) {
            return;

        }

        closeForumFekraV145();

    }, true);
    injectStyle();
    setup();
    document.addEventListener('DOMContentLoaded', setup);
    window.addEventListener('load', setup);
    var disabledMessageTimer = null;
    var disabledMessageNodes = [];
    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'characterData') {
                disabledMessageNodes.push(mutation.target);
                return;

            }

            if (mutation.target) disabledMessageNodes.push(mutation.target);
            Array.prototype.forEach.call(mutation.addedNodes || [], function (node) {
                if (node && (node.nodeType === 1 || node.nodeType === 3)) {
                    disabledMessageNodes.push(node);

                }


            });

        });
        if (!disabledMessageNodes.length) return;
        clearTimeout(disabledMessageTimer);
        disabledMessageTimer = setTimeout(function () {
            var nodes = disabledMessageNodes.slice();
            disabledMessageNodes.length = 0;
            nodes.forEach(scanForSystemMessages);

        }, 60);

    }).observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true

    });
    document.addEventListener('click', function (event) {
        var control = event.target.closest && event.target.closest(
        '#l1 button,#l1 input[type="submit"],#l1 input[type="button"],#l1 a.btn,' +
        '#l2 button,#l2 input[type="submit"],#l2 input[type="button"],#l2 a.btn,' +
        '#l3 button,#l3 input[type="submit"],#l3 input[type="button"],#l3 a.btn'
        );
        if (!control) return;
        var box = control.closest('#l1,#l2,#l3');
        scheduleLoginNoticeScan(box ? box.id : 'login');
        var controlText = cleanText(
        (control.textContent || '') + ' ' +
        (control.value || '') + ' ' +
        (control.getAttribute('title') || '') + ' ' +
        (control.getAttribute('aria-label') || '')
        );
        var activeTab = getTabs() && getTabs().querySelector('a[aria-expanded="true"],li.active a,a.lounge-tab-active-v12,a.lounge-tab-active-v13');
        var activeTabText = activeTab ? activeTab.textContent : '';
        if (isRegistrationTextV144(controlText) || isRegistrationTextV144(activeTabText)) {
            scheduleRegistrationClosedFallbackV144('registration-submit');

        }


    }, true);
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter') return;
        var field = event.target.closest && event.target.closest('#l1 input,#l2 input,#l3 input');
        if (!field) return;
        var box = field.closest('#l1,#l2,#l3');
        scheduleLoginNoticeScan(box ? box.id : 'login');

    }, true);
    setInterval(function () {
        markOriginalElements();
        bindTabEvents();
        bindEyeEvents();
        syncEyeState();
        setup();

    }, 500);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeModal();

    });
    document.addEventListener(
    'click',
    function () {
        setTimeout(function () {
            markOriginalElements();
            bindTabEvents();
            bindEyeEvents();
            syncEyeState();
            setup();

        }, 80);
        setTimeout(function () {
            syncActiveTab();
            syncEyeState();

        }, 300);

    },
    true
    );

})();



/* ==================================================
   9) موسيقى الواجهة الخارجية
   ==================================================
   التعديل السريع:
   - MUSIC_URL = رابط ملف الموسيقى.
   - ICON_URL = صورة أيقونة الموسيقى.
   - VOLUME = مستوى الصوت.
   ================================================== */
(function () {
    'use strict';
    if (window.__LOUNGE_WELCOME_MUSIC_V1__) return;
    window.__LOUNGE_WELCOME_MUSIC_V1__ = true;
    var MUSIC_URL = 'https://files.catbox.moe/62w4de.mp3';
    var ICON_URL = 'https://i.ibb.co/pjPhy9Hp/555555.png';
    var VOLUME = 0.25;
    var started = false;
    function isLoginPage() {
        return ['#l1', '#l2', '#l3'].some(function (selector) {
            var box = document.querySelector(selector);
            return box && !!box.querySelector('input,button');

        });

    }

    function hasExternalInterface() {
        return !!document.getElementById('loungeDesignCanvasV13');

    }

    function ensureIconStyle() {
        if (document.getElementById('loungeMusicIconStyleV1')) return;
        var style = document.createElement('style');
        style.id = 'loungeMusicIconStyleV1';
        style.textContent = `
#loungeMusicToggleV1{
position:absolute!important;
top:1%!important;
right:3%!important;
left:auto!important;
width:10.5%!important;
aspect-ratio:1/1!important;
min-width:34px!important;
max-width:50px!important;
border:0!important;
border-radius:50%!important;
background:transparent!important;
box-shadow:none!important;
cursor:pointer!important;
z-index:5!important;
display:flex!important;
align-items:center!important;
justify-content:center!important;
padding:0!important;
overflow:visible!important;
-webkit-tap-highlight-color:transparent!important;
}
#loungeMusicToggleV1 .lounge-music-icon-v1{
width:100%!important;
height:100%!important;
display:block!important;
background:url("${ICON_URL}") center/contain no-repeat!important;
transition:transform .18s ease, opacity .18s ease, filter .18s ease!important;
filter:drop-shadow(0 3px 8px rgba(54,103,137,.24))!important;
animation:loungeMusicPulseV1 1.65s ease-in-out infinite!important;
}
@keyframes loungeMusicPulseV1{
0%,100%{transform:scale(1);}
50%{transform:scale(1.10);}
}
#loungeMusicToggleV1:hover .lounge-music-icon-v1{
transform:scale(1.13)!important;
filter:drop-shadow(0 4px 10px rgba(54,103,137,.30))!important;
}
#loungeMusicToggleV1.is-muted .lounge-music-icon-v1{
opacity:.48!important;
transform:scale(.94)!important;
animation:none!important;
filter:grayscale(.25) drop-shadow(0 2px 5px rgba(54,103,137,.12))!important;
}
`;
        document.head.appendChild(style);

    }

    function ensureMusic() {
        if (!hasExternalInterface()) {
            removeMusic();
            return;

        }

        var audio = document.getElementById('loungeWelcomeMusicV1');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'loungeWelcomeMusicV1';
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = VOLUME;
            audio.src = MUSIC_URL;
            document.body.appendChild(audio);

        }

        if (!started) {
            var p = audio.play();
            if (p && typeof p.catch === 'function') {
                p.then(function () {
                    started = true;

                }).catch(function () {
                    document.addEventListener('click', function tryPlay() {
                        if (!hasExternalInterface()) {
                            removeMusic();
                            return;

                        }

                        audio.play().then(function () {
                            started = true;

                        }).catch(function () {

                        });
                        document.removeEventListener('click', tryPlay);

                    }, {
                        once: true
                    });

                });

            }
             else {
                started = true;

            }


        }

        ensureToggle(audio);

    }

    function ensureToggle(audio) {
        if (document.getElementById('loungeMusicToggleV1')) return;
        var canvas = document.getElementById('loungeDesignCanvasV13');
        if (!canvas) {
            removeMusic();
            return;

        }

        ensureIconStyle();
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'loungeMusicToggleV1';
        btn.setAttribute('title', 'كتم موسيقى الواجهة');
        btn.innerHTML = '<span class="lounge-music-icon-v1"></span>';
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            audio.muted = !audio.muted;
            btn.classList.toggle('is-muted', audio.muted);
            btn.setAttribute(
            'title',
            audio.muted ? 'تشغيل موسيقى الواجهة' : 'كتم موسيقى الواجهة'
            );

        });
        canvas.appendChild(btn);

    }

    function removeMusic() {
        var audio = document.getElementById('loungeWelcomeMusicV1');
        if (audio) {
            try {
                audio.pause();
                audio.currentTime = 0;

            }
             catch (e) {

            }

            audio.remove();

        }

        started = false;
        var toggle = document.getElementById('loungeMusicToggleV1');
        if (toggle) toggle.remove();

    }

    setInterval(function () {
        if (isLoginPage() && hasExternalInterface()) {
            ensureMusic();

        }
         else {
            removeMusic();

        }


    }, 500);
    new MutationObserver(function () {
        if (!hasExternalInterface()) {
            removeMusic();

        }


    }).observe(document.documentElement, {
        childList: true,
        subtree: true

    });

})();



/* ==================================================
   10) شريط الأخبار المتحرك
   ==================================================
   التعديل السريع:
   - NEWS_MESSAGES = رسائل الشريط.
   - SPEED = سرعة الحركة.
   - الرسائل الفارغة لا تظهر.
   ================================================== */
(function () {
    'use strict';
    if (window.__LOUNGE_NEWS_TICKER_V153__) return;
    window.__LOUNGE_NEWS_TICKER_V153__ = true;
    var NEWS_MESSAGES = [
    '   أهلا بنا في شات لاونج',
    'عزيزتنا توب ستظل قلوبنا معك دوما',
    ''
    ];
    var NEWS_EDGE_SYMBOL = '❖';
    var NEWS_SEPARATOR = '◆';
    var SPEED = 46;

    /* بكسل في الثانية */


    var rafId = null;
    var resizeBound = false;
    var retryTimer = null;
    function cleanMessage(value) {
        return String(value || '')
        .replace(/\s+/g, ' ')
        .trim();

    }

    function getActiveMessages() {
        return NEWS_MESSAGES
        .map(cleanMessage)
        .filter(function (message) {
            return message.length > 0;

        });

    }

    function escapeHtml(value) {
        return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    }

    function buildSingleMessageHtml(message) {
        return '' +
        '<span class="lounge-news-edge-v153">' + escapeHtml(NEWS_EDGE_SYMBOL) + '</span>' +
        '<span class="lounge-news-text-v153">' + escapeHtml(message) + '</span>' +
        '<span class="lounge-news-edge-v153">' + escapeHtml(NEWS_EDGE_SYMBOL) + '</span>';

    }

    function buildNewsHtml() {
        var messages = getActiveMessages();
        return messages.map(function (message, index) {
            var html = buildSingleMessageHtml(message);
            if (index < messages.length - 1) {
                html +=
                '<span class="lounge-news-separator-v153">' +
                escapeHtml(NEWS_SEPARATOR) +
                '</span>';

            }

            return html;

        }).join('');

    }

    function getCanvas() {
        return document.getElementById('loungeDesignCanvasV13');

    }

    function isLoginPage() {
        return ['#l1', '#l2', '#l3'].some(function (selector) {
            var box = document.querySelector(selector);
            return box && !!box.querySelector('input,button');

        });

    }

    function injectTickerStyle() {
        if (document.getElementById('loungeNewsTickerStyleV153')) return;
        var css = `
<style id="loungeNewsTickerStyleV153">
#loungeDesignCanvasV13{
--lounge-news-left:8.518519%;
--lounge-news-top:63.860000%;
--lounge-news-width:82.962963%;
--lounge-news-height:3.100000%;
}
#loungeNewsTickerV153{
position:absolute!important;
left:var(--lounge-news-left)!important;
top:var(--lounge-news-top)!important;
width:var(--lounge-news-width)!important;
height:var(--lounge-news-height)!important;
z-index:3!important;
overflow:hidden!important;
box-sizing:border-box!important;
pointer-events:none!important;
direction:rtl!important;
background:transparent!important;
border:0!important;
display:flex!important;
align-items:center!important;
justify-content:center!important;
}
#loungeNewsTickerV153 .lounge-news-viewport-v153{
position:relative!important;
width:100%!important;
height:100%!important;
overflow:hidden!important;
direction:rtl!important;
}
#loungeNewsTickerV153 .lounge-news-track-v153{
position:absolute!important;
top:50%!important;
left:0!important;
width:max-content!important;
min-width:max-content!important;
white-space:nowrap!important;
will-change:transform!important;
transform:translate3d(-100%,-50%,0);
}
#loungeNewsTickerV153 .lounge-news-text-v153{
display:inline-block!important;
white-space:nowrap!important;
color:#357fad!important;
font-size:clamp(12px,3.3vw,17px)!important;
font-weight:900!important;
line-height:1.35!important;
letter-spacing:.1px!important;
text-shadow:0 1px 0 rgba(255,255,255,.90),0 2px 6px rgba(65,126,165,.13)!important;
padding:0 6px!important;
}
#loungeNewsTickerV153 .lounge-news-edge-v153{
display:inline-block!important;
white-space:nowrap!important;
color:#c99b42!important;
font-size:clamp(13px,3.5vw,18px)!important;
font-weight:900!important;
line-height:1.35!important;
padding:0 4px!important;
text-shadow:0 1px 0 rgba(255,255,255,.90),0 0 6px rgba(201,155,66,.30)!important;
}
#loungeNewsTickerV153 .lounge-news-separator-v153{
display:inline-block!important;
white-space:nowrap!important;
color:#4d94c4!important;
font-size:clamp(13px,3.5vw,18px)!important;
font-weight:900!important;
line-height:1.35!important;
padding:0 12px!important;
text-shadow:0 1px 0 rgba(255,255,255,.90),0 0 6px rgba(77,148,196,.18)!important;
}
@media(max-width:520px){
#loungeNewsTickerV153 .lounge-news-text-v153{
font-size:clamp(12px,3.6vw,15px)!important;
padding:0 5px!important;
}
#loungeNewsTickerV153 .lounge-news-edge-v153,
#loungeNewsTickerV153 .lounge-news-separator-v153{
font-size:clamp(13px,3.8vw,16px)!important;
}
#loungeNewsTickerV153 .lounge-news-separator-v153{
padding:0 10px!important;
}
}
</style>`;
        document.head.insertAdjacentHTML('beforeend', css);

    }

    function stopTicker() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;

        }

        if (retryTimer) {
            clearTimeout(retryTimer);
            retryTimer = null;

        }


    }

    function ensureTickerElement() {
        var canvas = getCanvas();
        if (!canvas || !isLoginPage()) {
            stopTicker();
            return null;

        }

        var newsHtml = buildNewsHtml();
        if (!newsHtml) {
            stopTicker();
            return null;

        }

        injectTickerStyle();
        var ticker = document.getElementById('loungeNewsTickerV153');
        if (!ticker) {
            ticker = document.createElement('div');
            ticker.id = 'loungeNewsTickerV153';
            ticker.setAttribute('aria-hidden', 'true');
            ticker.innerHTML =
            '<div class="lounge-news-viewport-v153" id="loungeNewsViewportV153">' +
            '<div class="lounge-news-track-v153" id="loungeNewsTrackV153">' +
            newsHtml +
            '</div>' +
            '</div>';
            canvas.appendChild(ticker);

        }
         else {
            var existingTrack = document.getElementById('loungeNewsTrackV153');
            if (existingTrack) existingTrack.innerHTML = newsHtml;

        }

        return ticker;

    }

    function startTicker() {
        var ticker = ensureTickerElement();
        if (!ticker) return;
        var viewport = document.getElementById('loungeNewsViewportV153');
        var track = document.getElementById('loungeNewsTrackV153');
        if (!viewport || !track) return;
        stopTicker();
        var viewportWidth = Math.ceil(viewport.clientWidth || 0);
        var trackWidth = Math.ceil(track.offsetWidth || 0);
        if (!viewportWidth || !trackWidth) {
            retryTimer = setTimeout(startTicker, 80);
            return;

        }

        var startX = -trackWidth + 18;

        /* تقليل فراغ البداية ليظهر الشريط أسرع */


        var endX = viewportWidth;
        var x = startX;
        var lastTs = null;
        track.style.transform = 'translate3d(' + x + 'px,-50%,0)';
        function step(ts) {
            if (!document.getElementById('loungeNewsTickerV153') || !getCanvas() || !isLoginPage()) {
                stopTicker();
                return;

            }

            if (lastTs === null) lastTs = ts;
            var dt = Math.min((ts - lastTs) / 1000, 0.08);
            lastTs = ts;
            x += SPEED * dt;
            if (x > endX) {
                x = startX;

            }

            track.style.transform = 'translate3d(' + x + 'px,-50%,0)';
            rafId = requestAnimationFrame(step);

        }

        rafId = requestAnimationFrame(step);
        if (!resizeBound) {
            resizeBound = true;
            window.addEventListener('resize', function () {
                setTimeout(startTicker, 80);

            });

        }


    }

    function initTicker() {
        ensureTickerElement();
        startTicker();

    }

    initTicker();
    document.addEventListener('DOMContentLoaded', initTicker);
    window.addEventListener('load', initTicker);
    setTimeout(initTicker, 60);
    setTimeout(initTicker, 180);
    setTimeout(initTicker, 400);

})();



/* ==================================================
   11) تجميل أزرار داخلية الشات
   ==================================================
   التعديل السريع:
   - ألوان الشريط السفلي وأزرار الداخل.
   - تنبيهات الخاص والحائط.
   ================================================== */
(function () {
    'use strict';
    $('#loungeInternalButtonsStyleV1,#loungeInternalButtonsStyleV2,#loungeInternalButtonsStyleV3,#loungeInternalButtonsStyleV4,#loungeInternalButtonsStyleV41,#loungeInternalButtonsStyleV42,#loungeInternalButtonsStyleV43,#loungeInternalButtonsStyleV44,#loungeInternalButtonsStyleV45,#loungeInternalButtonsStyleV46,#loungeInternalButtonsStyleGoldSend,#loungeInternalButtonsStyleV47,#loungeInternalButtonsStyleV48,#loungeInternalButtonsStyleV49,#loungeInternalButtonsStyleV50,#loungeInternalButtonsStyleV51,#loungeInternalButtonsStyleV52,#loungeInternalButtonsStyleV53,#loungeInternalButtonsStyleV54').remove();
    var css = `
#d0{
background:linear-gradient(180deg,rgba(70,126,154,.92),rgba(55,103,132,.96) 48%,rgba(45,82,108,.98))!important;
border-top:1px solid rgba(205,166,82,.58)!important;
box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 -1px 6px rgba(34,86,116,.18)!important;
}
#d0 .th-d0-users,
#d0 .th-d0-chats,
#d0 .th-d0-rooms,
#d0 .th-d0-wall,
#d0 .th-d0-settings{
height:31px!important;
margin-top:2px!important;
background:linear-gradient(180deg,#fff 0%,rgba(251,253,253,.98) 32%,rgba(231,244,250,.96) 63%,rgba(190,223,239,.92) 100%)!important;
border:2px solid rgba(198,157,72,.78)!important;
color:#337da9!important;
border-radius:999px!important;
box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 rgba(74,142,177,.18),0 2px 5px rgba(34,86,116,.32),0 0 0 1px rgba(255,255,255,.45),0 0 5px rgba(198,157,72,.18)!important;
text-shadow:0 1px 0 rgba(255,255,255,.95),0 0 5px rgba(74,142,177,.12)!important;
}
#d0 .th-d0-users span,
#d0 .th-d0-chats span,
#d0 .th-d0-rooms span,
#d0 .th-d0-wall span,
#d0 .th-d0-settings span,
#d0 .th-d0-users:before,
#d0 .th-d0-chats:before,
#d0 .th-d0-rooms:before,
#d0 .th-d0-wall:before,
#d0 .th-d0-settings:before{
color:#2f7fae!important;
text-shadow:0 1px 0 rgba(255,255,255,.95),0 0 6px rgba(47,127,174,.22)!important;
}
.tablebox.footer button[onclick*="Tsend_TIGERHOST_UPLOAD"],
#d0 .th-d0-chats.lounge-has-alert,
#d0 .th-d0-wall.lounge-has-alert{
background:linear-gradient(180deg,#fffdf7 0%,#faefd9 24%,#eedcb8 55%,#ddc18a 100%)!important;
border:2px solid #bc9457!important;
color:#376784!important;
box-shadow:inset 0 1px 0 rgba(255,255,255,.88),inset 0 -1px 0 rgba(154,112,58,.16),0 2px 5px rgba(95,57,4,.16)!important;
text-shadow:0 1px 0 rgba(255,255,255,.60)!important;
}
.tablebox.footer button[onclick*="Tsend_TIGERHOST_UPLOAD"]{
height:33px!important;
margin-top:2px!important;
margin-left:2px!important;
padding:0 12px!important;
border-radius:7px!important;
font-weight:900!important;
}
.tablebox.footer button[onclick*="Tsend_TIGERHOST_UPLOAD"]:before,
#d0 .th-d0-chats.lounge-has-alert:before,
#d0 .th-d0-wall.lounge-has-alert:before,
#d0 .th-d0-chats.lounge-has-alert span,
#d0 .th-d0-wall.lounge-has-alert span{
color:#376784!important;
text-shadow:0 1px 0 rgba(255,255,255,.60)!important;
}
#d0 .th-d0-chats.lounge-has-alert,
#d0 .th-d0-wall.lounge-has-alert{
animation:loungeAlertPulseV54 1.2s ease-in-out infinite alternate!important;
}
@keyframes loungeAlertPulseV54{
from{filter:brightness(1);}
to{filter:brightness(1.08);}
}
.tablebox.footer .uploadP,
.tablebox.footer button[onclick*="leveDRoom"]{
height:33px!important;
margin-top:2px!important;
padding:0!important;
background:#3f8fbd!important;
border:1px solid rgba(198,157,72,.62)!important;
color:#fff!important;
border-radius:6px!important;
box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(20,70,100,.30),0 1px 3px rgba(34,86,116,.22)!important;
}
.tablebox.footer .uploadP{width:33px!important;margin-left:2px!important;}
.tablebox.footer button[onclick*="leveDRoom"]{width:25px!important;}
.tablebox.footer .uploadP:before,
.tablebox.footer button[onclick*="leveDRoom"]:before{
color:#fff!important;
text-shadow:0 1px 1px rgba(20,70,100,.45)!important;
}
@media (min-width:769px){
.tablebox.footer button[onclick*="Tsend_TIGERHOST_UPLOAD"]:hover,
#d0 .th-d0-chats.lounge-has-alert:hover,
#d0 .th-d0-wall.lounge-has-alert:hover{
background:linear-gradient(180deg,#ffffff 0%,#fcf3df 24%,#f1e0bb 55%,#e1c58e 100%)!important;
border-color:#b1884b!important;
}
.tablebox.footer .uploadP:hover,
.tablebox.footer button[onclick*="leveDRoom"]:hover{
background:#4799c6!important;
border-color:rgba(203,164,78,.80)!important;
}
}
@media (max-width:768px){
#d0{
background:linear-gradient(180deg,rgba(67,121,148,.94),rgba(48,91,119,.98))!important;
}
#d0 .th-d0-users,
#d0 .th-d0-chats,
#d0 .th-d0-rooms,
#d0 .th-d0-wall,
#d0 .th-d0-settings{
border-radius:999px!important;
}
}
`;
    $('<style id="loungeInternalButtonsStyleV54"></style>').html(css).appendTo('head');
    function getNum(sel){
        var el = document.querySelector(sel);
        if (!el) return 0;
        var n = parseInt((el.textContent || '').replace(/[^\d]/g,''),10);
        return isNaN(n) ? 0 : n;

    }

    function syncAlerts(){
        var pm = getNum('#d0 .pmc');
        var wall = getNum('#d0 .bwall');
        var chatBtn = document.querySelector('#d0 .th-d0-chats');
        var wallBtn = document.querySelector('#d0 .th-d0-wall');
        if (chatBtn) chatBtn.classList.toggle('lounge-has-alert', pm > 0);
        if (wallBtn) wallBtn.classList.toggle('lounge-has-alert', wall > 0);

    }

    syncAlerts();
    setInterval(syncAlerts, 300);
    new MutationObserver(syncAlerts).observe(document.body,{
        childList:true,
        subtree:true,
        characterData:true

    });

})();



/* ==================================================
   13) TikTok داخل الحائط — V1.5
   ==================================================
   التعديل السريع:
   - يعرض روابط TikTok الطويلة داخل iframe.
   - روابط vt/vm المختصرة تظهر بزر أنيق.
   ================================================== */
(function(){
    'use strict';
    if(window.__LOUNGE_TIKTOK_WALL_V15__)return;
    window.__LOUNGE_TIKTOK_WALL_V15__=1;
    var SID='lounge-tiktok-wall-v15-css';
    function css(){
        if(document.getElementById(SID))return;
        var s=document.createElement('style');
        s.id=SID;
        s.textContent='.lounge-tiktok-wall-frame{width:95%;max-width:195px;height:275px;border:0;display:block;margin:2px 0 4px 0;border-radius:8px;background:#000;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.18)}.lounge-tiktok-short-btn{direction:rtl;display:inline-flex!important;align-items:center;justify-content:center;gap:5px;max-width:210px;margin:3px 0 5px 0;padding:6px 10px;border-radius:9px;text-decoration:none!important;font-size:12px;font-weight:bold;line-height:1;color:#10384f!important;background:linear-gradient(135deg,#f7fbff,#dcecf5);border:1px solid rgba(190,145,55,.65);box-shadow:0 1px 5px rgba(0,0,0,.16),inset 0 0 0 1px rgba(255,255,255,.55);white-space:nowrap}.lounge-tiktok-short-btn:before{content:"♪";display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;color:#fff;background:#10384f;font-size:12px}@media(max-width:700px){.lounge-tiktok-wall-frame{max-width:185px;height:255px}.lounge-tiktok-short-btn{max-width:195px;font-size:11px;padding:6px 9px}}';
        document.head.appendChild(s)
    }
    function clean(u){
        return String(u||'').replace(/[),.]+$/,'')
    }
    function isTik(u){
        return /https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\//i.test(u||'')
    }
    function getUrl(m){
        var a=m.querySelectorAll('a');
        for(var i=0;
        i<a.length;
        i++){
            var h=clean(a[i].href||a[i].getAttribute('href')||'');
            if(isTik(h))return h
        }
        var t=m.innerText||m.textContent||'';
        var x=String(t).match(/https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\/[^\s<>"']+/i);
        return x?clean(x[0]):''
    }
    function vid(u){
        var x=String(u||'').match(/\/video\/(\d+)/i);
        return x&&x[1]?x[1]:''
    }
    function sh(u){
        return /^https?:\/\/(vt|vm)\.tiktok\.com\//i.test(u||'')
    }
    function hide(m){
        m.querySelectorAll('a').forEach(function(a){
            if(isTik(a.href||a.getAttribute('href')||''))a.style.display='none'
        });
        Array.from(m.childNodes).forEach(function(n){
            if(n.nodeType===3&&/tiktok\.com/i.test(n.nodeValue))n.nodeValue=''
        })
    }
    function frame(id){
        var f=document.createElement('iframe');
        f.className='lounge-tiktok-wall-frame';
        f.src='https://www.tiktok.com/embed/v2/'+id;
        f.allow='autoplay; encrypted-media; picture-in-picture; web-share';
        f.allowFullscreen=1;
        f.loading='lazy';
        f.setAttribute('data-tiktok-id',id);
        return f
    }
    function btn(u){
        var a=document.createElement('a');
        a.className='lounge-tiktok-short-btn';
        a.href=u;
        a.target='_blank';
        a.rel='noopener noreferrer';
        a.innerHTML='<span dir="rtl">فتح مقطع <bdi dir="ltr">TikTok</bdi></span>';
        a.setAttribute('data-tiktok-short','1');
        return a
    }
    function put(m,e){
        var b=m.querySelector('.Del_com');
        b?m.insertBefore(e,b):m.appendChild(e)
    }
    function one(m){
        if(!m||m.nodeType!==1||!m.closest('.thBcType-wall'))return;
        var u=getUrl(m);
        if(!u)return;
        var id=vid(u);
        if(id){
            if(m.querySelector('.lounge-tiktok-wall-frame[data-tiktok-id="'+id+'"]'))return;
            put(m,frame(id));
            hide(m);
            return
        }
        if(sh(u)){
            if(m.querySelector('.lounge-tiktok-short-btn'))return;
            put(m,btn(u));
            hide(m)
        }

    }
    function scan(){
        css();
        document.querySelectorAll('.thBcType-wall .u-msg.break').forEach(one)
    }
    var tm=null;
    function later(){
        clearTimeout(tm);
        tm=setTimeout(scan,250)
    }
    scan();
    new MutationObserver(later).observe(document.body,{
        childList:1,subtree:1
    })
})();



/* ==================================================
   14) تأكيد إرسال التنبيه للعضو — V6
   ==================================================
   التعديل السريع:
   - يظهر تأكيد باسم العضو قبل إرسال التنبيه.
   ================================================== */
(function(){
    'use strict';
    if(window.__LOUNGE_CONFIRM_MEMBER_NOTICE_V6__)return;
    window.__LOUNGE_CONFIRM_MEMBER_NOTICE_V6__=1;
    var lastName='';
    function c(v){
        return String(v||'').replace(/\s+/g,' ').trim()
    }
    function onlyName(v){
        v=c(v).replace(/تنبيه|إرسال|ارسال|اكتب رسالتك هنا|ROOM|العامة/gi,'').trim();
        v=v.split('|')[0].split('<')[0].split(':')[0];
        v=v.replace(/[,،]\s*(المملكة|السعودية|العربية|[A-Za-z])/gi,'');
        v=v.replace(/\s*المملكة العربية السعودية\s*/gi,'');
        v=v.replace(/\b\d+\b/g,'').replace(/\s+/g,' ').trim();
        return v
    }
    function getName(btn){
        var r=btn.closest('.uzr,.uhtml,.upop,.popover,.modal,.panel,div'),t,x,ls;
        if(!r)return'';
        for(var i=0;
        i<7&&r;
        i++,r=r.parentElement){
            t=r.querySelector('.u-topic,.thUserName,.username,.ucard-name,.u-name,.nosel');
            x=onlyName(t?t.textContent:'');
            if(x)return x;
            ls=c(r.innerText||r.textContent).split('\n').map(onlyName).filter(Boolean);
            for(var j=0;
            j<ls.length;
            j++){
                if(ls[j]&&ls[j]!=='تنبيه'&&ls[j].indexOf('رسالتك')<0)return ls[j]
            }

        }
        return''
    }
    document.addEventListener('click',function(e){
        var u=e.target.closest&&e.target.closest('.unot');
        if(u){
            lastName=getName(u);
            return
        }
        var b=e.target.closest&&e.target.closest('.th-mmnot-send');
        if(!b)return;
        var box=b.closest('.th-mmnot-box'),ta=box?box.querySelector('.th-mmnot-textarea'):null,txt=ta?c(ta.value):'';
        if(!txt)return;
        var msg=lastName?'هل تريد إرسال التنبيه إلى '+lastName+'؟':'هل تريد إرسال هذا التنبيه؟';
        if(!confirm(msg)){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false
        }

    },true)
})();



/* ==================================================
   15) فقاعات الرسائل النصية
   ==================================================
   التعديل السريع:
   - شكل الفقاعة داخل .lounge-bubble.
   - يستثني TikTok والمايكات وبعض الحاويات.
   ================================================== */
(function(){
    'use strict';
    if(window.__BUBBLE_TEST_V1__)return;
    window.__BUBBLE_TEST_V1__=true;
    $('<style id="bubbleTestV1">.lounge-bubble{display:inline-block!important;max-width:80%!important;padding:7px 12px!important;margin:3px 0!important;border-radius:15px 15px 15px 6px!important;background:linear-gradient(135deg,rgba(255,255,255,.98) 0%,rgba(232,245,255,.96) 50%,rgba(210,235,252,.94) 100%)!important;border:1px solid rgba(100,170,220,.30)!important;color:#1a3a52!important;font-size:14px!important;font-weight:800!important;line-height:1.75!important;direction:rtl!important;word-break:break-word!important;box-shadow:0 2px 5px rgba(39,86,112,.10),-5px 5px 0 -4px rgba(210,235,252,.88),-6px 6px 0 -4px rgba(100,170,220,.20)!important}</style>').appendTo('head');
    function wrap(el){
        var $msg=$(el);
        if($msg.find('.lounge-bubble').length)return;
        if($msg.closest('#users,#d0,.tablebox,.modal,.th-mic-wrap').length)return;
        if($msg.find('.lounge-tiktok-wall-frame').length)return;
        if(/tiktok\.com/i.test($msg.text()))return;
        var nodes=$msg.contents().filter(function(){
            return this.nodeType===3&&this.nodeValue.trim().length>0
        });
        if(!nodes.length)return;
        nodes.wrapAll('<span class="lounge-bubble"></span>')
    }
    function scan(){
        $('.u-msg.break').each(function(){
            wrap(this)
        })
    }
    scan();
    new MutationObserver(function(mutations){
        mutations.forEach(function(m){
            $(m.addedNodes).each(function(){
                if($(this).hasClass('u-msg'))wrap(this);
                $(this).find('.u-msg.break').each(function(){
                    wrap(this)
                })
            })
        })
    }).observe(document.body,{
        childList:true,subtree:true
    })
})();



/* ==================================================
   16) سلايدر صور البرواز الخارجي — لاونج V3
   ==================================================
   التعديل السريع:
   - F = صورة البرواز.
   - A = قائمة الصور والأسماء.
   - S = مدة بقاء الصورة.
   - Fd = مدة التلاشي.
   ================================================== */
(function(){
    'use strict';
    if(window.__LFS_V3)return;
    window.__LFS_V3=1;
    var D=document,F='https://i.ibb.co/4nQVZQfy/6666.png',A=[
    ['الغلاف','https://i.ibb.co/S47Hz7pk/111.png'],['توب','https://i.ibb.co/gZsjFM0y/Top.png'],['جولي','https://i.ibb.co/HMv2tLX/3.png'],['زهور','https://i.ibb.co/v44B16Wt/4.png'],['غيد','https://i.ibb.co/DPj3BzbY/5.png'],['كيتو','https://i.ibb.co/d0BJjFJs/10.png'],['ايلافيو','https://i.ibb.co/xPR3B5M/6.png'],['ميشو','https://i.ibb.co/dw4p1c9v/8.png'],['ريما','https://i.ibb.co/rVXzY8M/7.png'],['يارا','https://i.ibb.co/MqfFWSZ/9.png'],['بصمة','https://i.ibb.co/bjL88LXT/12.png'],['صمود','https://i.ibb.co/vvJQsxLp/11.png']
    ],S=4300,Fd=1050,T=0;
    function q(s){
        return D.querySelector(s)
    }
    function L(){
        return['#l1','#l2','#l3'].some(function(s){
            var b=q(s);
            return b&&b.querySelector('input,button')
        })
    }
    function C(){
        return q('#loungeDesignCanvasV13')
    }
    var I=A.filter(function(x){
        return x[1]
    }),H=I.filter(function(x){
        return x[0]=='الغلاف'
    }),R=I.filter(function(x){
        return x[0]!='الغلاف'
    });
    for(var i=R.length-1;
    i>0;
    i--){
        var j=Math.floor(Math.random()*(i+1)),t=R[i];
        R[i]=R[j];
        R[j]=t
    }
    I=H.concat(R);
    function pre(){
        I.concat([['',F]]).forEach(function(x){
            var im=new Image;
            im.src=x[1]
        })
    }
    function css(){
        if(q('#lfsCssV3'))return;
        var s=D.createElement('style');
        s.id='lfsCssV3';
        s.textContent='#lfsW{position:absolute!important;left:3.333333%!important;top:46.212121%!important;width:50%!important;height:13.368984%!important;z-index:3!important;pointer-events:none!important;overflow:visible!important;box-sizing:border-box!important}#lfs{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;overflow:visible!important}#lfs .c{position:absolute!important;left:2.4%!important;top:5%!important;width:95.2%!important;height:90%!important;overflow:hidden!important;border-radius:10px!important;z-index:1!important}#lfs .p{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;opacity:0!important;transition:opacity '+Fd+'ms ease-in-out!important;filter:saturate(1.04) contrast(1.02) brightness(1.02)!important}#lfs .p.on{opacity:1!important}#lfs .p.k{animation:lfsKb '+(S+Fd)+'ms ease-in-out forwards!important}@keyframes lfsKb{0%{transform:scale(1.06) translate(0,0)}100%{transform:scale(1.01) translate(-1.5%,-1%)}}#lfs .f{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:fill!important;z-index:4!important;user-select:none!important;-webkit-user-drag:none!important}body:not(.lounge-unified-v12) #lfsW,body.lounge-login-modal-open-v12 #lfsW{display:none!important}';
        D.head.appendChild(s)
    }
    function clean(){
        if(T)clearInterval(T),T=0;
        ['loungeFrameSliderWrapV29','loungeFrameSliderV29','lfsW'].forEach(function(id){
            var e=q('#'+id);
            if(e)e.remove()
        });
        ['loungeFrameSliderStyleV29','lfsCssV3'].forEach(function(id){
            var e=q('#'+id);
            if(e)e.remove()
        })
    }
    function kb(e){
        e.classList.remove('k');
        void e.offsetWidth;
        e.classList.add('k')
    }
    function build(){
        var c=C();
        if(!c||!L()||!I.length)return;
        if(q('#lfsW'))return;
        clean();
        css();
        var w=D.createElement('div');
        w.id='lfsW';
        w.innerHTML='<div id="lfs"><div class="c"><img class="p p1"><img class="p p2"></div><img class="f" src="'+F+'"></div>';
        c.appendChild(w);
        var p1=q('#lfs .p1'),p2=q('#lfs .p2'),a=p1,b=p2,n=1;
        p1.src=I[0][1];
        kb(p1);
        p1.classList.add('on');
        function sw(){
            if(!q('#lfsW')){
                if(T)clearInterval(T),T=0;
                return
            }
            var it=I[n++%I.length];
            b.onload=function(){
                kb(b);
                a.classList.remove('on');
                b.classList.add('on');
                var o=a;
                a=b;
                b=o;
                b.onload=null
            };
            b.src=it[1]
        }
        if(I.length>1)T=setInterval(sw,S)
    }
    function init(){
        pre();
        build();
        setTimeout(build,300);
        setTimeout(build,900)
    }
    init();
    D.addEventListener('DOMContentLoaded',init);
    window.addEventListener('load',init);
    new MutationObserver(function(){
        if(!q('#lfsW'))build()
    }).observe(D.documentElement,{
        childList:1,subtree:1
    })
})();



/* ==================================================
   17) إصلاح اختفاء آخر رسالة خلف شريط الكتابة
   ==================================================
   التعديل السريع:
   - يحسب ارتفاع الشريط السفلي ويضيف margin-bottom لآخر رسالة.
   ================================================== */
(function () {
    'use strict';
    if (window.__LOUNGE_MSG_PAD_FIX__) return;
    window.__LOUNGE_MSG_PAD_FIX__ = true;
    var STYLE_ID = 'lounge-msg-pad-style-v1';
    function getBottomBarHeight() {
        var total = 0;
        var inputBar = document.querySelector('.tablebox.footer');
        if (inputBar) total += inputBar.offsetHeight;
        var d0 = document.getElementById('d0');
        if (d0) total += d0.offsetHeight;
        return total || 90;

    }


        function applyFix() {
        var old = document.getElementById(STYLE_ID);
        if (old) old.remove();
        var h = getBottomBarHeight() - 50;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent =
                    '.irp1:last-child,' +
                    '.uzr.d-flex.mm:last-child {' +
                    '    margin-bottom: ' + h + 'px !important;' +
                    '}';
        document.head.appendChild(style);

    }


        applyFix();
    setInterval(applyFix, 2000);

})();



/* ==================================================
   18) همساتنا — GS V5.4 safe
   ==================================================
   التعديل السريع:
   - U = رابط Google Apps Script.
   - K = رمز الربط.
   - M = الحد الأقصى لحروف الهمسة.
   - MIN / PC / MX = توقيت عرض الهمسات.
   ================================================== */
(function(){
    'use strict';
    if(window.__LW54)return;
    window.__LW54=1;
    var D=document,F='https://i.ibb.co/4nQVZQfy/6666.png',U='https://script.google.com/macros/s/AKfycbyGAPw6DukUYGhxGmSRLS7uWUNfsPFtIKP8ui9H10ACfjg1yUSqGjfUY4krJDV220WCuA/exec',K='Lounge2026',A=[],M=90,MIN=3200,PC=95,MX=9000,T=0,I=0,SD=0,SKL='__LW_LAST_USER__',SKD='__LW_LAST_DISPLAY__';
    function q(s,r){
        return(r||D).querySelector(s)
    }
    function qa(s,r){
        return[].slice.call((r||D).querySelectorAll(s))
    }
    function L(){
        return['#l1','#l2','#l3'].some(function(s){
            var b=q(s);
            return b&&b.querySelector('input,button')
        })
    }
    function C(){
        return q('#loungeDesignCanvasV13')
    }
    function x(v){
        return String(v||'').replace(/[<>]/g,'').replace(/\s+/g,' ').trim()
    }
    function si(v){
        var c=[10240,8203,8204,8205,8234,8235,8236,8237,8238,65279],s=String(v||'');
        for(var i=0;
        i<c.length;
        i++)s=s.split(String.fromCharCode(c[i])).join('');
        return s
    }
    function ik(v){
        return si(x(v)).toLowerCase()
    }
    function su(n){
        n=x(n);
        if(n){
            window.__LWU=n;
            try{
                sessionStorage.setItem(SKL,n)
            }
            catch(e){

            }

        }

    }
    function gu(){
        try{
            return x(window.__LWU||sessionStorage.getItem(SKL)||'')
        }
        catch(e){
            return x(window.__LWU||'')
        }

    }
    function gk(){
        return ik(gu())
    }
    function sd(n){
        n=x(n);
        if(n){
            try{
                sessionStorage.setItem(SKD,n)
            }
            catch(e){

            }

        }

    }
    function gd(){
        try{
            return x(sessionStorage.getItem(SKD)||'')
        }
        catch(e){
            return''
        }

    }
    function jp(p,cb){
        var n='lw'+Date.now()+Math.random().toString(36).slice(2),s,dn=0;
        p.cb=n;
        window[n]=function(r){
            if(dn)return;
            dn=1;
            try{
                cb(r||{

                })
            }
            finally{
                delete window[n];
                s&&s.remove&&s.remove()
            }

        };
        s=D.createElement('script');
        s.src=U+(U.indexOf('?')>-1?'&':'?')+Object.keys(p).map(function(k){
            return encodeURIComponent(k)+'='+encodeURIComponent(p[k])
        }).join('&');
        s.onerror=function(){
            if(dn)return;
            dn=1;
            delete window[n];
            cb({
                ok:0,msg:'net'
            })
        };
        D.body.appendChild(s);
        setTimeout(function(){
            if(dn)return;
            dn=1;
            delete window[n];
            cb({
                ok:0,msg:'timeout'
            })
        },8000)
    }
    function load(){
        jp({
            action:'list'
        },function(r){
            if(r&&r.ok&&r.items){
                A=r.items;
                rt()
            }

        })
    }
    function send(t,u,k,cb){
        jp({
            action:'add',key:K,u:u,t:t,ik:k
        },cb)
    }
    function cn(e){
        var y=e&&e.target,b;
        if(!y)return;
        b=y.closest&&y.closest('#l1,#l2,#l3,form,.tab-pane,.loginbox');
        if(!b)return;
        qa('input',b).some(function(i){
            var t=String(i.type||'').toLowerCase(),v=x(i.value);
            if(v&&!/password|hidden|button|submit/.test(t)){
                su(v);
                return 1
            }

        })
    }
    D.addEventListener('click',cn,1);
    D.addEventListener('keydown',function(e){
        if(e.key==='Enter')cn(e)
    },1);
    function css(){
        if(q('#lw54css'))return;
        var s=D.createElement('style');
        s.id='lw54css';
        s.textContent='#lw54{position:absolute!important;left:3.333333%!important;top:71.238895%!important;width:50%!important;height:13.368984%!important;z-index:3!important;direction:rtl!important;pointer-events:none!important;font-family:Tahoma,Arial!important}#lw54b{position:absolute!important;inset:0!important}#lw54i{position:absolute!important;left:2.4%!important;top:5%!important;width:95.2%!important;height:90%!important;overflow:hidden!important;border-radius:10px!important;background:linear-gradient(180deg,rgba(255,255,255,.88),rgba(232,246,255,.72))!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;padding:7px 10px 14px!important;box-sizing:border-box!important}.lw54t{font-size:clamp(11px,2.9vw,15px)!important;color:#c99b42!important;font-weight:900!important;text-shadow:0 1px 0 #fff!important;margin-bottom:2px!important}.lw54x{max-width:96%!important;font-size:clamp(10px,2.7vw,14px)!important;color:#357fad!important;font-weight:900!important;line-height:1.5!important;min-height:31px!important;display:flex!important;align-items:center!important;justify-content:center!important;word-break:break-word!important;text-shadow:0 1px 0 #fff!important;opacity:1!important;transition:opacity .45s ease!important}.lw54a{font-size:clamp(9px,2.3vw,12px)!important;color:#6d93ad!important;font-weight:800!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:94%!important;opacity:1!important;transition:opacity .45s ease!important}#lw54f{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:fill!important;z-index:4!important;pointer-events:none!important}body:not(.lounge-unified-v12) #lw54,body.lounge-login-modal-open-v12 #lw54{display:none!important}#lw54btn{position:fixed!important;right:10px!important;bottom:78px!important;z-index:2147482500!important;display:none!important;direction:rtl!important;border:1px solid rgba(201,155,66,.72)!important;border-radius:999px!important;background:linear-gradient(180deg,#fff,rgba(229,244,253,.96))!important;color:#357fad!important;font-family:Tahoma,Arial!important;font-size:13px!important;font-weight:900!important;padding:7px 13px!important;box-shadow:0 4px 13px rgba(44,96,126,.20),inset 0 1px 0 #fff!important;cursor:pointer!important}body:not(.lounge-unified-v12) #lw54btn{display:block!important}#lw54m{position:fixed!important;inset:0!important;z-index:2147483900!important;background:rgba(41,72,93,.38)!important;display:none!important;align-items:center!important;justify-content:center!important;direction:rtl!important;font-family:Tahoma,Arial!important}#lw54m.o{display:flex!important}#lw54p{width:min(92vw,390px)!important;border-radius:18px!important;background:linear-gradient(180deg,#fff,#ebf7fd)!important;border:1px solid rgba(201,155,66,.62)!important;box-shadow:0 18px 55px rgba(52,103,136,.34)!important;padding:16px!important;box-sizing:border-box!important;color:#355568!important}#lw54p h3{margin:0 0 5px!important;text-align:center!important;color:#357fad!important;font-size:20px!important;font-weight:900!important}#lw54p p{margin:0 0 12px!important;text-align:center!important;color:#7b9ab0!important;font-size:12px!important;font-weight:800!important;line-height:1.8!important}.lw54in{width:100%!important;height:38px!important;margin:6px 0!important;padding:0 10px!important;box-sizing:border-box!important;border-radius:9px!important;border:1px solid rgba(87,157,201,.38)!important;background:#fff!important;color:#355568!important;outline:none!important;font-size:14px!important}#lw54ta{width:100%!important;height:88px!important;margin:6px 0!important;padding:9px 10px!important;box-sizing:border-box!important;border-radius:9px!important;border:1px solid rgba(87,157,201,.38)!important;background:#fff!important;color:#355568!important;outline:none!important;font-size:14px!important;resize:none!important;line-height:1.7!important}#lw54st{min-height:20px!important;text-align:center!important;font-size:12px!important;font-weight:900!important;color:#b06f6f!important;margin:4px 0 8px!important}.lw54ac{display:flex!important;gap:8px!important}.lw54ac button{flex:1!important;height:38px!important;border-radius:999px!important;font-size:14px!important;font-weight:900!important;cursor:pointer!important}.lw54ac button:disabled{opacity:.55!important;cursor:not-allowed!important}.lw54s{border:1px solid rgba(214,173,88,.62)!important;background:linear-gradient(180deg,#5eaddf,#3f91c9,#347fae)!important;color:#fff!important}.lw54c{border:1px solid rgba(87,157,201,.28)!important;background:linear-gradient(180deg,#fff,#edf6fb)!important;color:#4a6f86!important}@media(max-width:520px){#lw54btn{right:8px!important;bottom:72px!important;font-size:12px!important;padding:6px 11px!important}}';
        D.head.appendChild(s)
    }
    function ext(){
        var v=C();
        if(!v||!L()||q('#lw54'))return;
        css();
        var z=D.createElement('div');
        z.id='lw54';
        z.innerHTML='<div id="lw54b"><div id="lw54i"><div class="lw54t">همساتنا</div><div class="lw54x" id="lw54x">جارٍ تحميل الهمسات...</div><div class="lw54a" id="lw54a">— همساتنا —</div></div><img id="lw54f" src="'+F+'"></div>';
        v.appendChild(z);
        load()
    }
    function btn(){
        if(q('#lw54btn'))return;
        css();
        var b=D.createElement('button');
        b.id='lw54btn';
        b.type='button';
        b.textContent='✦ همستي اليوم';
        b.onclick=function(e){
            e.preventDefault();
            e.stopPropagation();
            op()
        };
        D.body.appendChild(b)
    }
    function mod(){
        if(q('#lw54m'))return;
        css();
        var m=D.createElement('div');
        m.id='lw54m';
        m.innerHTML='<div id="lw54p"><h3>همستي اليوم</h3><p>لكل عضو همسة واحدة فقط كل يوم<br>بعد 12 الليل تقدر تكتب همسة جديدة</p><input id="lw54n" class="lw54in" placeholder="اسم الظهور"><textarea id="lw54ta" maxlength="'+M+'" placeholder="اكتب همستك هنا..."></textarea><div id="lw54st"></div><div class="lw54ac"><button id="lw54c" class="lw54c" type="button">إلغاء</button><button id="lw54s" class="lw54s" type="button">إرسال الهمسة</button></div></div>';
        D.body.appendChild(m);
        q('#lw54c').onclick=cls;
        q('#lw54s').onclick=sn;
        m.onclick=function(e){
            if(e.target==m)cls()
        }

    }
    function op(){
        mod();
        q('#lw54n').value=gd()||gu();
        q('#lw54ta').value='';
        st(gk()?'سيُمنع التكرار حسب حساب الدخول، حتى لو غيّرت اسم الظهور':'يفضّل تسجيل الخروج والدخول مرة أخرى لضمان منع التكرار',gk()?1:0);
        q('#lw54m').classList.add('o');
        setTimeout(function(){
            q('#lw54n').focus()
        },50)
    }
    function cls(){
        var m=q('#lw54m');
        if(m)m.classList.remove('o')
    }
    function st(t,o){
        var s=q('#lw54st');
        if(s){
            s.textContent=t||'';
            s.style.color=o?'#357fad':'#b06f6f'
        }

    }
    function setS(on){
        SD=on;
        var b=q('#lw54s');
        if(b)b.disabled=!!on
    }
    function sn(){
        if(SD)return;
        var u=x(q('#lw54n').value),t=x(q('#lw54ta').value),k=gk()||ik(u);
        if(!u)return st('اكتب اسم الظهور');
        if(!t)return st('اكتب الهمسة');
        if(t.length>M)return st('الحد الأقصى '+M+' حرف');
        sd(u);
        setS(1);
        st('جارٍ الإرسال...',1);
        send(t,u,k,function(r){
            setS(0);
            var m=r&&r.msg;
            if(r&&r.ok){
                st(m==='pending'?'تم الإرسال بانتظار الاعتماد':'تم إرسال الهمسة',1);
                load();
                setTimeout(cls,700)
            }
            else{
                if(m==='duplicate')st('كتبت همستك اليوم بالفعل');
                else if(m==='bad_key')st('رمز الربط غير صحيح');
                else if(m==='timeout'||m==='net')st('تعذر الاتصال، حاول مرة أخرى');
                else if(m==='long')st('الهمسة طويلة');
                else st('تعذر إرسال الهمسة الآن')
            }

        })
    }
    function dur(t){
        return Math.min(MX,MIN+(t?t.length:0)*PC)
    }
    function show(y){
        var t=q('#lw54x'),a=q('#lw54a');
        if(!t||!a)return;
        t.style.opacity=0;
        a.style.opacity=0;
        setTimeout(function(){
            t.textContent=y?'“ '+y.t+' ”':'لا توجد همسات بعد...';
            a.textContent=y?'— '+y.u+' —':'— همساتنا —';
            t.style.opacity=1;
            a.style.opacity=1
        },240)
    }
    function step(){
        if(T)clearTimeout(T);
        if(A.length<=1)return;
        T=setTimeout(function(){
            I=(I+1)%A.length;
            show(A[I]);
            step()
        },dur(A[I]&&A[I].t))
    }
    function rt(){
        if(T)clearTimeout(T);
        I=0;
        if(!A.length)return show(null);
        show(A[I]);
        step()
    }
    function init(){
        ext();
        btn();
        mod()
    }
    init();
    D.addEventListener('DOMContentLoaded',init);
    window.addEventListener('load',init);
    setInterval(function(){
        if(!C()||!L()){
            var z=q('#lw54');
            if(z)z.remove();
            if(T)clearTimeout(T),T=0
        }
        else ext()
    },1500);
    setInterval(load,60000);
    D.addEventListener('keydown',function(e){
        if(e.key==='Escape')cls()
    })
})();



/* ==================================================
   19) إخراج أعضاء محددين بتوقيت معيّن
   ==================================================
   التعديل السريع:
   - N = أسماء الأعضاء الممنوعين.
   - S = بداية وقت المنع بالدقائق بتوقيت السعودية.
   - E = نهاية وقت المنع بالدقائق بتوقيت السعودية.
   أمثلة:
   - S = 0    يعني 12:00 ليلًا.
   - E = 360  يعني 06:00 صباحًا.
   ملاحظة:
   - المنع الحالي من 12 ليلًا إلى 6 صباحًا.
   ================================================== */
(function(){
    'use strict';
    if(window.__LTBK1)return;
    window.__LTBK1=1;
    var N=['F','تواضع شيوخ','عضو3','عضو4','عضو5'],S=0,E=360,M='الموقع تحت الصيانة الدورية حاليًا.\n\nسنعود قريبًا، شكرًا لتفهمكم.',K='__LTBK_USER__',LA=0,KS=0,d=document;
    function c(v){
        try{
            return String(v||'').normalize('NFC').replace(/\s+/g,' ').trim().toLowerCase()
        }
        catch(e){
            return String(v||'').replace(/\s+/g,' ').trim().toLowerCase()
        }

    }
    function bn(n){
        n=c(n);
        return n&&N.some(function(x){
            return c(x)==n
        })
    }
    function tm(){
        var p=new Intl.DateTimeFormat('en-GB',{
            timeZone:'Asia/Riyadh',hour:'2-digit',minute:'2-digit',hour12:0
        }).formatToParts(new Date),h=0,m=0;
        p.forEach(function(x){
            if(x.type=='hour')h=+x.value||0;
            if(x.type=='minute')m=+x.value||0
        });
        return h*60+m
    }
    function it(){
        var n=tm();
        return S==E?0:S<E?n>=S&&n<E:n>=S||n<E
    }
    function vis(e){
        if(!e)return 0;
        var r=e.getBoundingClientRect();
        return r.width>0&&r.height>0
    }
    function box(){
        var p=[].slice.call(d.querySelectorAll('input[type="password"]')).find(vis);
        return p?p.closest('#l2,form,.modal,.tab-pane,.panel,.loginbox'):0
    }
    function user(r){
        if(!r)return'';
        var a=[].slice.call(r.querySelectorAll('input'));
        for(var i=0;
        i<a.length;
        i++){
            var t=String(a[i].type||'').toLowerCase(),v=String(a[i].value||'').trim();
            if(v&&!/password|hidden|button|submit/.test(t))return v
        }
        return''
    }
    function rem(n){
        n=String(n||'').trim();
        if(!n)return;
        window.__LTBK_CUR=n;
        try{
            sessionStorage.setItem(K,n)
        }
        catch(e){

        }

    }
    function get(){
        try{
            return window.__LTBK_CUR||sessionStorage.getItem(K)||''
        }
        catch(e){
            return window.__LTBK_CUR||''
        }

    }
    function out(){
        return[].slice.call(d.querySelectorAll('button,a,.btn,.label')).find(function(e){
            var t=String(e.innerText||e.value||'').trim(),cl=String(e.className||'');
            return t.indexOf('تسجيل خروج')>-1||cl.indexOf('SERT')>-1
        })
    }
    function stop(ev){
        var b=box();
        if(!b||ev&&ev.target&&!b.contains(ev.target))return;
        var u=user(b);
        if(u)rem(u);
        if(!it()||!bn(u))return;
        var n=Date.now();
        if(n-LA<1500)return;
        LA=n;
        alert(M);
        if(ev){
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation()
        }
        return!1
    }
    function kick(){
        if(KS||!it()||!bn(get()))return;
        var o=out();
        if(!o)return;
        KS=1;
        alert(M);
        setTimeout(function(){
            try{
                o.click()
            }
            catch(e){

            }

        },500)
    }
    d.addEventListener('click',function(e){
        var x=e.target&&e.target.closest?e.target.closest('button,input[type="button"],input[type="submit"],a,.btn,[onclick]'):0;
        if(x)stop(e)
    },1);
    d.addEventListener('submit',stop,1);
    d.addEventListener('keydown',function(e){
        if(e.key==='Enter')stop(e)
    },1);
    setTimeout(kick,1000);
    setInterval(kick,5000)
})();
