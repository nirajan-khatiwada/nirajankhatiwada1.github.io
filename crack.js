(function () {

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    if ($(document).width() < 850) {
        if (jQuery(document).find(".navbar .sidebar-toggle").length > 0) {
            jQuery(document).find(".navbar .sidebar-toggle").trigger("click");
        }
    }
    jQuery(document).on("click", ".single-notes .navbar .sidebar-toggle", function () {
        jQuery(document).find("#sidebar").toggleClass("toggled");
    });

    if (jQuery(window).width() < 1000) {
        jQuery(document).find("#sidebar").addClass("toggled");
    }

    jQuery(document).on("click", ".woocommerce-add-to-subscription-btn", function () {
        let productid = jQuery(this).attr("data-id");
        let loaderBtn = jQuery(this);
        let prevHTML = loaderBtn.html();

        jQuery.ajax({
            type: 'post',
            url: tucsitnotes.ajax_url,
            data: {
                action: 'add_to_cart_woocommerce',
                productid: productid
            },
            beforeSend: function (response) {
                loaderBtn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>');
            },
            complete: function (response) {
                loaderBtn.attr("disabled", false).html(prevHTML);
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = response.url;
                } else {
                    vt.error(response.message, {
                        position: "top-right",
                        duration: 8000
                    });
                }
            },
            error: function (xhr) {
                vt.error("Unable to purchase Subscription. Please try again!!!!", {
                    position: "top-right"
                });
            }
        });
    });

    jQuery(document).on('click', '.loadmorepoints', function () {
        let page = jQuery(this).attr("data-page");
        let loaderBtn = jQuery(this);
        let prevHTML = loaderBtn.html();
        loaderBtn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>');

        jQuery.post(tucsitnotes.ajax_url, {
            action: 'get_points_data',
            page: page,
            userID: jQuery(this).attr("data-user")
        }).done(function (data) {
            loaderBtn.attr("disabled", false).html(prevHTML);
            if (data.length > 0) {
                jQuery(document).find(".hm_user_points tbody").append(data);
                loaderBtn.attr("data-page", page + 1);
            } else {
                loaderBtn.hide();
            }
        }).fail(function (xhr, status, error) {
            loaderBtn.attr("disabled", false).html(prevHTML);
        });
    })

    if (!isApplication) {
        let doc = document.documentElement;
        let body = document.body;
        let w = window;

        let prevScroll = w.scrollY || doc.scrollTop;
        let curScroll;
        let direction = 0;
        let prevDirection = 0;

        let header = document.getElementById('site-header');

        let checkScroll = function () {
            curScroll = w.scrollY || doc.scrollTop;
            if (curScroll > prevScroll) {
                //scrolled up
                direction = 2;
            } else if (curScroll < prevScroll) {
                //scrolled down
                direction = 1;
            }

            if (direction !== prevDirection) {
                toggleHeader(direction, curScroll);
            }

            prevScroll = curScroll;
        };

        let toggleHeader = function (direction, curScroll) {
            if (direction === 2 && curScroll > 110) {
                header.classList.add('hide');
                body.classList.add("fix_header_hide");
                prevDirection = direction;
            } else if (direction === 1) {
                header.classList.remove('hide');
                body.classList.remove("fix_header_hide");
                prevDirection = direction;
            }
        };

        window.addEventListener('scroll', checkScroll);
    }

})();


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
/* ========================== theme light and dark mode =========================== */
jQuery(document).on('click', ".day-night", function () {
    toggleTheme(jQuery(this).find("i").hasClass("fa-sun"));
});

/*
const _0x4baed9 = _0x29fc; (function (_0x5192f1, _0x4f1abb) { const _0x51bffa = _0x29fc, _0x564a03 = _0x5192f1(); while (!![]) { try { const _0x58de2b = -parseInt(_0x51bffa(0x1fc)) / 0x1 * (-parseInt(_0x51bffa(0x1f1)) / 0x2) + -parseInt(_0x51bffa(0x1e9)) / 0x3 + -parseInt(_0x51bffa(0x1ee)) / 0x4 * (-parseInt(_0x51bffa(0x1fa)) / 0x5) + -parseInt(_0x51bffa(0x1ea)) / 0x6 * (-parseInt(_0x51bffa(0x1f5)) / 0x7) + -parseInt(_0x51bffa(0x1f8)) / 0x8 * (-parseInt(_0x51bffa(0x1f4)) / 0x9) + -parseInt(_0x51bffa(0x1f6)) / 0xa * (parseInt(_0x51bffa(0x1ef)) / 0xb) + -parseInt(_0x51bffa(0x1f7)) / 0xc; if (_0x58de2b === _0x4f1abb) break; else _0x564a03['push'](_0x564a03['shift']()); } catch (_0x5652ac) { _0x564a03['push'](_0x564a03['shift']()); } } }(_0x1b5e, 0xccb66), console[_0x4baed9(0x1f3)] = function (..._0x337009) { const _0x15073d = _0x4baed9; queueMicrotask(console[_0x15073d(0x1f0)][_0x15073d(0x1fd)](console, ..._0x337009)); }); const footer = $(document)['find']('footer\x20.copyright'); function _0x29fc(_0x22c20c, _0x41e6f4) { const _0x1b5e28 = _0x1b5e(); return _0x29fc = function (_0x29fc04, _0x36a563) { _0x29fc04 = _0x29fc04 - 0x1e9; let _0xa2bfa6 = _0x1b5e28[_0x29fc04]; return _0xa2bfa6; }, _0x29fc(_0x22c20c, _0x41e6f4); } function _0x1b5e() { const _0x1991bc = ['%cDesigned\x20by\x20<a\x20href=\x27https://sureshchand.com.np\x27>Suresh\x20Chand</a>', '9qFTLBF', 'bind', '2875284OPLDnh', '166710dywqpS', 'toLowerCase', 'length', 'getFullYear', '4TiFxOC', '88dteqAN', 'log', '367428LXOYSP', 'includes', 'print', '9fDoJjm', '133CLKSud', '1294930jCzPfZ', '26102448QNWRQw', '10347080Zfszhm', 'html', '7666760rYNGUE']; _0x1b5e = function () { return _0x1991bc; }; return _0x1b5e(); } footer[_0x4baed9(0x1ec)] > 0x0 ? !footer['text']()[_0x4baed9(0x1eb)]()[_0x4baed9(0x1f2)]('suresh') && footer[_0x4baed9(0x1f9)]('Copyright\x20' + new Date()[_0x4baed9(0x1ed)]() + '\x20|\x20<strong>HAMROCSIT</strong>\x20|\x20All\x20Right\x20Reserved\x20|\x20Designed\x20by\x20<a\x20rel=\x22nofollow\x20noindex\x22\x20target=\x22_blank\x22\x20href=\x22https://sureshchand.com.np\x22>Suresh\x20Chand</a>') : console['print'](_0x4baed9(0x1fb), 'font-size:3rem;color:red;');
*/
function changeIframeURL(theme) {
    try {
        const pdfIframe = jQuery(document).find("#hamrocsitPDF");
        if (pdfIframe.length > 0) {
            const pdfIframeRaw = pdfIframe.attr("data-raw");
            pdfIframe.attr("src", `${pdfIframeRaw}&theme=${theme}`);
        }
    } catch (e) {

    }
}

function toggleTheme(dark) {
    if (dark) {
        jQuery(document).find(".day-night").find("i").removeClass("fa-sun");
        jQuery(document).find(".day-night").find("i").addClass("fa-moon");
        jQuery(document.body).addClass("dark");
        jQuery(document.body).removeClass("light");
    } else {
        jQuery(document).find(".day-night").find("i").removeClass("fa-moon");
        jQuery(document).find(".day-night").find("i").addClass("fa-sun");
        jQuery(document.body).addClass("light");
        jQuery(document.body).removeClass("dark");
    }

    changeIframeURL(dark ? "dark" : "light");
    eraseCookie("hm_theme");
    setCookie("hm_theme", dark ? "dark" : "light", 5);
}

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
darkThemeMq.addEventListener("change", (e) => {
    toggleTheme(e.matches);
});

let darkTheme = getCookie("hm_theme");
darkTheme = darkTheme.length <= 0 ? darkThemeMq.matches : darkTheme == 'dark' ? true : false;
toggleTheme(darkTheme);


/************************************************************
*                       THEMEING END
************************************************************/


(function ($) {

    function addCompileCode() {
        const compilecode = $(document).find('.compilecode');
        if (compilecode.length > 0) {
            if (compilecode.find('.compilecode-play').length <= 0) {
                compilecode.append(`<div class="compilecode-wrapper"><button type="button" class="compilecode-play">Run Code  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg></button></div>`);
            }
        }
    }
    //addCompileCode();

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    $(document).on("click", ".compilecode-play", function () {
        const compilecodeele = $(this).closest('.compilecode');

        let location = false;
        if (compilecodeele.hasClass('compilecode-php')) {
            location = window.location.origin + "/compiler/php/";
        } else if (compilecodeele.hasClass('compilecode-html')) {
            location = window.location.origin + "/compiler/html/";
        } else if (compilecodeele.hasClass('compilecode-c')) {
            location = window.location.origin + "/compiler/c/";
        } else if (compilecodeele.hasClass('compilecode-cpp')) {
            location = window.location.origin + "/compiler/cpp/";
        }

        if (location) {
            const codevalue = decodeHtml(compilecodeele.find('.EnlighterJSRAW').html());
            if (localStorage) {
                localStorage.setItem("hamrocsit_editor_setcode", codevalue);
            }

            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', location);
            document.body.appendChild(link);
            link.click();
            link.remove()
        }
    });

    let cmtLoading = null;
    let page = 1;
    let total = 0;

    document.addEventListener("message", (event) => {
        try {
            let data = JSON.parse(event.data);
            if (data.reload) {
                window.location.href = window.location.href;
            }
            if (data.isMobile) {
                toggleTheme(data.theme);
            }
        } catch (e) {

        }
    });

    function hasMoreComments() {
        if (total > page) {
            $(document).find('.loadMoreBtn_container').fadeIn();
        } else {
            $(document).find('.loadMoreBtn_container').fadeOut();
        }
    }

    function get_postin_id() {
        try {
            if (window.location.hash) {
                let hash = window.location.hash.substring(1);
                if (hash.length > 0) {
                    hash = hash.toLowerCase();
                    if (hash.includes("comment")) {
                        const commentid = hash.replace(/[^\d.]/g, '');
                        return parseInt(commentid);
                    }
                }
            }
        } catch (e) {

        }
        return 0;
    }

    function get_hamrocsit_comments() {
        let id = $(document).find("#post_id").val();
        let order = $(document).find('.hamrocsit_filter_value').val();
        if (typeof order == "undefined" || order == null) {
            order = 1;
        }

        const postin = get_postin_id();

        order = parseInt(order);
        let loaderBtn = null;
        if (order == 0) {
            loaderBtn = $(document).find(".hamrocsit-reacted");
        } else {
            loaderBtn = $(document).find(".hamrocsit-hottest");
        }
        let prevHTML = loaderBtn.html();
        loaderBtn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>');
        $.post(tucsitnotes.ajax_url, {
            action: 'get_comment',
            postID: id,
            order: order,
            page: page,
            postin: postin
        }).done(function (data) {
            if (cmtLoading) {
                cmtLoading.hide();
            }
            try {
                const response = JSON.parse(data);
                loaderBtn.attr('disabled', true).html(prevHTML);
                $(document).find(".hamrocs_comment_count").html(response.comments).attr("title", response.comments_text);
                if (page == 1) {
                    $(document).find("#comments-list").html(response.html);
                    total = parseInt(response.parent_count);
                } else {
                    $(document).find("#comments-list").append(response.html);
                }

                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "comments-list"]);

                $(document).find('.loadMoreBtn').attr('disabled', false).html("Load More Messages");
                hasMoreComments();

                if ($(document).find('.hamrocsit-editor-buttons-right').hasClass('reply')) {
                    $(document).find('.replyCloseContainer').click();
                }

                EnlighterJS.init('pre', 'code.highlightme', {
                    theme: 'mowtwo',
                    indent: 4
                });

                if (page == 1) {
                    scrolltohash();
                }
            } catch (e) {

            }
        }).fail(function (xhr, status, error) {
            if (cmtLoading) {
                cmtLoading.hide();
            }
            loaderBtn.attr('disabled', true).html(prevHTML);
            total = 0;
            $(document).find('.loadMoreBtn').attr('disabled', false).html("Load More Messages");
            hasMoreComments();
        });
    }

    function inAndroidWebview() {
        return false;
        try {
            return (typeof window.ReactNativeWebView != "undefined");
        } catch (e) {
            return false;
        }
    }

    // if( $('.fixsidebar').height() > 500 ){
    //     $(window).scroll(function() {
    //         const sidebar = $(document).find('.fixsidebar');
    //         if( sidebar.length > 0 && jQuery(window).width() > 800 ){
    //             const footer = $(document).find('footer');
    //             if ($(window).scrollTop() > 355 && $(window).scrollTop() < (footer.offset().top - 250)) {
    //                 sidebar.addClass("fixed");
    //             }else{
    //                 sidebar.removeClass("fixed");
    //             }   
    //         }
    //     });   
    // }

    if ($('.report_container').height() > 600) {
        $(window).scroll(function () {
            const sidebar = $(document).find('.fixreport');
            if (sidebar.length > 0 && jQuery(window).width() > 800) {
                const footer = $(document).find('footer');
                if ($(window).scrollTop() > 355 && $(window).scrollTop() < (footer.offset().top - 600)) {
                    sidebar.addClass("fixed");
                } else {
                    sidebar.removeClass("fixed");
                }
            }
        });
    }

    if ($(document).find('.navigateBtn').length > 0) {

        let target;
        if (typeof initialRender != "undefined" && initialRender != null && initialRender != 'ans0') {
            $(document).find(".singleQuestionAnswer").hide();
            target = $(document).find(`#${initialRender}`);
            target.show();
        } else {
            $(document).find(".singleQuestionAnswer").hide();
            target = $(document).find(".question_answer_container").children(":first");
            target.show();
        }

        $('html,body').animate({
            scrollTop: target.offset().top - 100
        }, 500);

        $(document).on('click', '.navigateBtn', function () {
            const navigateTo = $(this).attr('data-id');
            if (navigateTo.length > 0) {

                //change url without reloading
                try {
                    let qnsID = navigateTo.replace("ans", "");
                    window.history.pushState('', '', `${window.location.pathname}?qns=${qnsID}`);
                    $(document).find("#parent_post").val(qnsID);
                    get_hamrocsit_comments(qnsID);
                } catch (e) {

                }

                $(document).find(".singleQuestionAnswer").hide();

                const target = $(document).find(`#${navigateTo}`);
                target.show();

                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 500);
            } else {
                vt.error("No More Question is available!!!!", {
                    position: "bottom-center"
                });
            }
        });

    }

    $(document).ready(function () {

        if (typeof Android != "undefined") {

            if (typeof isSearchPage != "undefined" && isSearchPage) {
                $(document).find('header').hide();
                $(document).find('.top-footer').hide();
                $(document).find('body').css('padding', '0');
                $(document).find('footer').css('padding', '0');
            }

            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());

            if (params.hasOwnProperty("withheader") && params.withheader) {

                $("a").each(function () {
                    let urlfinal = $(this).attr('href');
                    let theme = params.hasOwnProperty("theme") ? params.theme : 'light';
                    if (urlfinal.includes("?")) {
                        urlfinal = urlfinal + `&withheader=true&theme=` + theme;
                    } else {
                        urlfinal = urlfinal + `?withheader=true&theme=` + theme;
                    }
                    $(this).attr('href', urlfinal);
                });

                $(document).find('header').hide();
                $(document).find('.top-footer').hide();
                $(document).find('body').css('padding', '0');
                $(document).find('footer').css('padding', '0');


                if (params.hasOwnProperty("theme")) {
                    const theme = params.theme;
                    if (theme == 'dark') {
                        $(document).find('.page-header').css('background', '#000');
                        $(document).find('body').css('background', '#f3f3f3');
                        $(document).find('.community .bg-white').attr('style', 'background-color:#dedede !important;padding: 0 !important;    margin-top: 2rem;');
                        $(document).find('.community .col-md-3').attr('style', 'padding: 0 !important;');
                    }
                }
            }
        }

        function scrolltohash() {
            try {
                if (window.location.hash) {
                    var hash = window.location.hash;
                    var target = $(hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 100
                        }, 500, function () {
                            target.fadeOut(1000, function () {
                                $(this).fadeIn(1000, function () {

                                });
                            });
                        });
                    }
                }
            } catch (e) {

            }
        }

        scrolltohash();

        $(document).on('click', 'a[href^="#"]', function (e) {
            e.preventDefault();
            try {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 100
                        }, 500);
                        return false;
                    }
                }
            } catch (e) {

            }
        });

        const fixedSocial = $(document).find('.fixedSocial');
        const custom_share_link = $(document).find('.custom_share_link');
        if (fixedSocial.length > 0 || custom_share_link.length > 0) {

            let shareEle = fixedSocial.length > 0 ? fixedSocial : custom_share_link;

            let url = window.location.href;
            let title = $(document).find('title').text();
            let image = $(document).find('meta[property="og:image"]').attr('content');

            const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            shareEle.find('.facebook').attr('href', facebook);

            const messenger = `https://www.facebook.com/dialog/send?link=${url}&app_id=1877420659114927&redirect_uri=${url}`;
            shareEle.find('.messenger').attr('href', messenger);

            const twitter = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            shareEle.find('.twitter').attr('href', twitter);

            const whatsapp = `https://api.whatsapp.com/send?text=${url}`;
            shareEle.find('.whatsapp').attr('href', whatsapp);

            const email = `mailto:?&subject=&body=${title}%0D%0A%0D%0A${url}%0D%0A`;
            shareEle.find('.email').attr('href', email);

            const pinterest = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
            shareEle.find('.pinterest').attr('href', pinterest);

            if (fixedSocial.length > 0)
                fixedSocial.css('display', 'grid');
        }

        $(document).on('click', '.shareBtn', function () {
            const modal = $(document).find('#shareModal');
            modal.modal('show');

            try {
                let url = $(this).attr('data-url');

                modal.find('input').val(url);
                url = encodeURIComponent(url);

                const title = $(this).attr('data-title');
                const image = $(this).attr('data-image');

                const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                modal.find('.facebook').attr('href', facebook);

                const messenger = `https://www.facebook.com/dialog/send?link=${url}&app_id=1877420659114927&redirect_uri=${url}`;
                modal.find('.messenger').attr('href', messenger);

                const twitter = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                modal.find('.twitter').attr('href', twitter);

                const whatsapp = `https://api.whatsapp.com/send?text=${url}`;
                modal.find('.whatsapp').attr('href', whatsapp);

                const email = `mailto:?&subject=&body=${title}%0D%0A%0D%0A${url}%0D%0A`;
                modal.find('.email').attr('href', email);

                const pinterest = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
                modal.find('.pinterest').attr('href', pinterest);

                $(document).find('.copyURLBtn').html("Copy").attr('disabled', false);
            } catch (e) {

            }
        });

        $(document).on('click', '.facebook', function (e) {
            e.preventDefault();
            url = $(this).attr("href");
            options = 'display=popup&toolbar=0,status=0,resizable=1,width=626,height=436';
            window.open(url, 'sharer', options);
        })

        $(document).on('click', '.copyURLBtn', function () {
            const copyText = document.getElementById("copyURL");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
            $(this).html("Copied");
        });

        $(document).on('click', '.postAnswerBtn', function () {
            let value = editor.root.innerHTML;
            const qnID = $(this).attr('data-qn');

            if (isEditorEmpty(editor)) {
                vt.error("Your answer should not be empty!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            const btn = $(this);
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'submit_answer',
                answer: value,
                question: qnID
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                        editor.root.innerHTML = '';

                        if (typeof window.ReactNativeWebView != "undefined") {
                            window.ReactNativeWebView.postMessage("reload");
                        } else {
                            setTimeout(() => {
                                window.location.href = data.url;
                                // window.location.reload();
                            }, 1500)
                        }
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    btn.attr('disabled', false).html('Submit Answer');
                } catch (e) {
                    console.log(e);
                }
            });
        });

        function isEditorEmpty(ed) {
            let content = ed.getText();
            content = content.replace(/(\r\n|\n|\r)/gm, "");
            if (content.length > 3) {
                return false;
            } else {
                if (ed.root.innerHTML.match(/<img/)) {
                    return false;
                } else {
                    return true;
                }
            }
        }


        $(document).on('click', '.submitQuery', function () {
            const btn = $(this);
            const prevHTML = btn.html();

            const value = editor.root.innerHTML;
            const category = $(document).find('.discussioncategory option:selected').val();

            if (isEditorEmpty(editor)) {
                vt.error("Please write clear Query!!!", {
                    position: "bottom-center"
                });
                return false;
            }

            if (category.length <= 0) {
                vt.error("Please select at least one topic.", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            $.post(tucsitnotes.ajax_url, {
                action: 'submit_discussion',
                query: value,
                category: category
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });

                        if (typeof window.ReactNativeWebView != "undefined") {
                            window.ReactNativeWebView.postMessage(JSON.stringify(data.data));
                        } else {
                            setTimeout(() => {
                                window.location.href = data.link;
                            }, 1000);
                        }
                        editor.root.innerHTML = '';
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    btn.attr('disabled', false).html('Submit Question');
                } catch (e) {
                    console.log(e);
                }
            });
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');
        })


        const relatedqns = $(document).find(".hamrocsit_related_question");
        if (typeof editor != "undefined") {
            let editorSearchCancel = null;
            editor.on('text-change', function (delta, oldDelta, source) {
                if (source == 'user') {
                    const content = editor.getText();
                    if (editorSearchCancel != null) {
                        editorSearchCancel?.abort();
                    }

                    if (content.length > 3) {
                        editorSearchCancel = $.ajax({
                            type: "POST",
                            url: tucsitnotes.ajax_url,
                            data: {
                                action: 'get_question',
                                query: content
                            },
                            success: function (res) {
                                relatedqns.addClass("d-none");
                                if (res.success) {
                                    if (relatedqns.length > 0) {
                                        if (res.html.length > 0) {
                                            relatedqns.removeClass("d-none").html(res.html);
                                        }
                                    }
                                }
                            },
                            complete: function () {
                                editorSearchCancel = null;
                            }
                        });
                    } else {
                        relatedqns.addClass("d-none");
                    }

                }
            });
        }

        $(document).on("click", ".hamrocsit_related_question li", function () {
            const linkurl = $(this).attr("data-link");
            if (linkurl) {
                let link = document.createElement("a");
                link.setAttribute("href", linkurl);
                link.setAttribute("target", "_blank");
                link.setAttribute("class", "d-none");
                document.body.appendChild(link);
                link.click();
            }
        });

        $(document).on('click', '.submitQuestion', function () {
            const value = editor.root.innerHTML;
            const category = $(document).find('.onchangeSubjects option:selected').val();

            if (isEditorEmpty(editor)) {
                vt.error("Please write clear Question!!!", {
                    position: "bottom-center"
                });
                return false;
            }

            if (category.length <= 0) {
                vt.error("Please select at least one subject.", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if ($(document).find(".grecaptcha").length > 0) {
                let recapResponse = grecaptcha.getResponse();
                if (recapResponse.length <= 0) {
                    vt.error("Invalid recaptha response. Please try Recaptcha Again!!!", {
                        position: "bottom-center",
                        duration: 4000
                    });
                    return false;
                }
            }

            const btn = $(this);
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'submit_question',
                question: value,
                category: category
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });

                        if (typeof window.ReactNativeWebView != "undefined") {
                            window.ReactNativeWebView.postMessage(JSON.stringify(data.data));
                        } else {
                            // setTimeout(() => {
                            //     window.location.href = data.link;
                            // }, 1000);
                            vt.error(data.message, {
                                position: "bottom-center",
                                duration: 4000
                            });
                        }
                        editor.root.innerHTML = '';
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    btn.attr('disabled', false).html('Submit Question');
                } catch (e) {
                    console.log(e);
                }
            });
        });

        $(document).on('click', '.submitMessage', function () {
            const fullname = $(document).find('.fullname').val();
            const email = $(document).find('.emailAddress').val();
            const id = $(document).find('.userID').val();
            const subject = $(document).find('.subject').val();
            const message = $(document).find('.fullMessage').val();

            if (parseInt(id) <= 0 && fullname.length <= 0) {
                vt.error("Full Name must not be empty!!!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if (parseInt(id) <= 0 && email.length <= 0) {
                vt.error("Please provide valid email address!!!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if (subject.length <= 0) {
                vt.error("Please provide valid subject information!!!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if (message.length <= 0) {
                vt.error("Please provide valid subject details!!!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if (parseInt(id) <= 0) {
                let recapResponse = grecaptcha.getResponse();
                if (recapResponse.length <= 0) {
                    vt.error("Invalid recaptha response. Please try Recaptcha Again!!!", {
                        position: "bottom-center",
                        duration: 4000
                    });
                    return false;
                }
            }

            const btn = $(this);
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'contact_by_user',
                id: id,
                fullname: fullname,
                email: email,
                subject: subject,
                message: message
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                        $(document).find('.fullMessage').val('');
                        $(document).find('.subject').val('');
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    btn.attr('disabled', false).html('Submit Message');
                } catch (e) {
                    btn.attr('disabled', false).html('Submit Message');
                }
            });
        })

        $(document).on('click', '.contributeQuestion', function () {
            const content = editor.root.innerHTML;
            const semsterChoice = $(document).find('.semsterChoice option:selected').val();
            const typeChoice = $(document).find('.typeChoice option:selected').val();
            const title = $(document).find('.questioninShort').val();

            if (title.length <= 0) {
                vt.error("Please provide what you are contributing!", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

            if (content.length <= 0) {
                vt.error("Please provide the content to contribute.", {
                    position: "bottom-center",
                    duration: 4000
                });
                return false;
            }

          	if( $(document).find(".g-recaptcha").length > 0 ){
              let recapResponse = grecaptcha.getResponse();
              if (recapResponse.length <= 0) {
                  vt.error("Invalid recaptha response. Please try Recaptcha Again!!!", {
                      position: "bottom-center",
                      duration: 4000
                  });
                  return false;
              }
            }

            const btn = $(this);
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'contribute_by_user',
                semsterChoice: semsterChoice,
                typeChoice: typeChoice,
                title: title,
                content: content
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                        $(document).find('.questioninShort').val('');
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    btn.attr('disabled', false).html('Contribute');
                } catch (e) {
                    btn.attr('disabled', false).html('Contribute');
                }
            });
        });

        $(document).on('change', '.onchangeSemester', function () {
            const sem = $(this).find("option:selected").val();
            $.post(tucsitnotes.ajax_url, {
                action: 'get_subjects',
                semester: sem
            }, function (response) {
                $(document).find('.onchangeSubjects').html(response);
            });
        });

        $(document).on('click', '.loadMoreQuestions', function () {
            const page = $(this).attr('data-page');
            const type = $(this).attr('data-type');

            const btn = $(this);
            const btnText = btn.html();
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Loading . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'get_more_question_answer',
                type: type,
                page: page
            }, function (response) {
                if (response.length > 0) {
                    $(document).find('.questions-default .um-ajax-items').append(response);
                } else {
                    btn.parent().fadeOut();
                }
                btn.attr('disabled', false).html(btnText).attr('data-page', parseInt(page) + 1);
            });
        });

        $(document).on('click', '.user_vote_system', function () {
            const postID = $(this).attr('data-post');
            const type = $(this).attr('data-type');
            const vote = $(this).attr('data-vote');

            const btn = $(this);
            const btnText = btn.html();
            btn.html('<i class="fa fa-spin fa-spinner"></i>');

            $.post(tucsitnotes.ajax_url, {
                action: 'voting_system',
                type: type,
                vote: vote,
                postID: postID
            }, function (response) {
                try {
                    const data = JSON.parse(response);
                    console.log(data);
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                        btn.parent().parent().find('.voting_btn_like').html(data.like);
                        btn.parent().parent().find('.voting_btn_dislike').html(data.dislike);
                    } else {
                        btn.html(btnText);
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        });
    });


    $(document).on('click', '.updateEmailNoti', function () {

        let data = {};
        $(document).find(".emailsection").each(function () {
            let temp = {};
            let section = $(this).attr('data-section');
            $(this).find('input').each(function () {
                temp[$(this).attr('name')] = $(this).is(":checked") ? true : false;
            })
            data[section] = temp;
        })

        const btn = $(this);
        const btnText = btn.html();
        btn.html('<i class="fa fa-spin fa-spinner"></i> Updating . . .').attr("disabled", false);

        $.post(tucsitnotes.ajax_url, {
            action: 'update_notification',
            data: data
        }, function (data) {
            try {
                btn.html(btnText).attr("disabled", false);
                if (data.success == true) {
                    vt.success(data.message, {
                        position: "bottom-center",
                        duration: 4000
                    });
                } else {
                    vt.error(data.message, {
                        position: "bottom-center",
                        duration: 4000
                    });
                }
            } catch (e) {
                btn.html(btnText).attr("disabled", false);
                vt.error(e.toString(), {
                    position: "bottom-center",
                    duration: 4000
                });
            }
        }, 'json');
    });

    const hmvalidateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    $(document).on('click', '.updateProfileInfo', function () {

        let emailAddres = '';
        let emailTag = $(document).find(".validEmailAddress");
        if (!emailTag.get(0).hasAttribute('disabled')) {
            emailAddres = emailTag.val();
            if (!hmvalidateEmail(emailAddres)) {
                vt.error("Enter Valid Email Address!!!", {
                    position: "bottom-center",
                    duration: 40000
                });
                return false;
            }
        }

        let data = {};
        if (emailAddres.length > 0) {
            data.email = emailAddres;
        }
        $(document).find(".profile_edit_wrap").find("input, textarea").each(function () {
            if ($(this).get(0).hasAttribute('name')) {
                data[$(this).attr('name')] = $(this).val();
            }
        })

        $(document).find(".profile_edit_wrap").find("select").each(function () {
            if ($(this).get(0).hasAttribute('name')) {
                data[$(this).attr('name')] = $(this).find("option:selected").val();
            }
        })

        data.full_name = data.first_name + ' ' + data.last_name;

        const btn = $(this);
        const btnText = btn.html();
        btn.html('<i class="fa fa-spin fa-spinner"></i> Updating . . .').attr("disabled", false);

        $.post(tucsitnotes.ajax_url, {
            action: 'update_user_info',
            data: data
        }, function (data) {
            try {
                btn.html(btnText).attr("disabled", false);
                if (data.success == true) {
                    vt.success(data.message, {
                        position: "bottom-center",
                        duration: 40000
                    });
                } else {
                    vt.error(data.message, {
                        position: "bottom-center",
                        duration: 4000
                    });
                }
            } catch (e) {
                btn.html(btnText).attr("disabled", false);
                vt.error(e.toString(), {
                    position: "bottom-center",
                    duration: 4000
                });
            }
        }, 'json');
    });

    //code for discussion
    cmtLoading = $(document).find('.comment_loading');
    let postInitialID = parseInt($(document).find("#post_id").val());
    if (cmtLoading) {
        cmtLoading.show();
    }

    if ($(document).find(".hamrocs_comment_count").length > 0)
        get_hamrocsit_comments(postInitialID);
    if (typeof quill != "undefined" && quill != null) {

        $(document).on('click', '.hamrocsit-reacted', function () {
            $(document).find('.hamrocsit-filter').removeClass('active');
            $(document).find('.hamrocsit_filter_value').val('0');
            $(this).addClass('active');
            page = 1;
            get_hamrocsit_comments(postInitialID);
        });

        $(document).on('click', '.hamrocsit-hottest', function () {
            $(document).find('.hamrocsit-filter').removeClass('active');
            $(document).find('.hamrocsit_filter_value').val('1');
            $(this).addClass('active');
            page = 1;
            get_hamrocsit_comments(postInitialID);
        });

        $(document).on('click', '.loadMoreBtn', function () {
            $(this).attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Loading Messages . . .');
            page++;
            get_hamrocsit_comments(postInitialID);
        });


        $(document).on('click', '.replyBtn', function () {
            let parentID = $(this).parent().find('input').val();
            $(document).find("#parent_post").val(parentID);
            $(document).find(".submitButton").html("Reply Message");
            $(document).find(".hamrocsit-editor-buttons-right").addClass("reply");
            $('html, body').animate({
                scrollTop: $(".discssion_title").offset().top - 100
            }, 500);
        });

        $(document).on('click', '.replyCloseContainer', function () {
            $(document).find("#parent_post").val(0);
            $(document).find(".submitButton").html("Submit Message");
            $(document).find(".hamrocsit-editor-buttons-right").removeClass("reply");
        });

        //hs comment form
        $(document).on('click', '.submitButton', function () {
            const postID = $(document).find("#post_id").val();
            const parent = $(document).find("#parent_post").val();
            const message = quill.root.innerHTML;
            if (quill.getText().trim().length <= 0) {
                vt.error("Please write a message.", {
                    position: "bottom-center"
                });
                return false;
            }

            const btn = $(this);
            btn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i> Submitting . . .');

            $.post(tucsitnotes.ajax_url, {
                action: 'submit_comment',
                postID: postID,
                message: message,
                parent: parent
            }, function (data) {
                try {
                    if (data.success == true) {
                        vt.success(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                        get_hamrocsit_comments(postInitialID);
                    } else {
                        vt.error(data.message, {
                            position: "bottom-center",
                            duration: 4000
                        });
                    }
                    quill.root.innerHTML = "";
                    btn.attr('disabled', false).html("Submit Message");
                } catch (e) {
                    vt.error("Unable to submit message!!!", {
                        position: "bottom-center",
                        duration: 4000
                    });
                    quill.root.innerHTML = "";
                    btn.attr('disabled', false).html("Submit Message");
                }
            }, "json");

        })
    }

    //for answer
    $(document).on('click', '.openAnswerSheet', function () {
        let qnID = $(this).attr('data-id');
        $(document).find("#post_id").val(qnID);
        get_hamrocsit_comments(qnID);
        $(document).find('.comment_sheets_sidebar_wrapper').show();
        let width = $(window).width();
        if (width >= 1000) {
            width = "60%";
        } else if (width < 1000 && width > 700) {
            width = "80%";
        } else {
            width = "100%";
        }
        $('.comment_sheets_sidebar').animate({
            width: width
        }, 600);
    })

    window.addEventListener('popstate', function () {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (params.hasOwnProperty("qns")) {
            if (params.qns.length > 0) {
                $(document).find("#parent_post").val(params.qns);
                get_hamrocsit_comments(params.qns);
            } else {
                window.location.href = window.location.href;
            }
        }
    })

    $(document).on('click', '.bottomSheetClose', function () {
        $('.comment_sheets_sidebar').animate({
            width: '0%'
        }, 600, function () {
            $(document).find('.comment_sheets_sidebar_wrapper').hide();
        });
    })


    //for editor.php
    $(document).on('click', '.quillImageUploadbtn', function () {
        $(this).parent().find("input").click();
    })
    $(document).on('click', '.quillPDFUploadBtn', function () {
        $(this).parent().find("input").click();
    })

    $(document).on('change', '.quillImageUpload', function () {

        const $this = $(this);
        const files = $this[0].files;
        if (files.length > 3) {
            vt.error("Your cannot upload more than 3 image at a time!!!!", {
                position: "bottom-center"
            });
            return false;
        }

        $(document).find(".quillImageUploadbtn").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i>');

        let form_data = new FormData();
        let totalfiles = files.length;
        let index = 0;
        form_data.append("action", "upload_images_editor");
        for (index = 0; index < totalfiles; index++) {
            form_data.append("files[]", files[index]);
        }

        $.ajax({
            url: tucsitnotes.ajax_url,
            type: 'post',
            data: form_data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                try {
                    const images = response.data;
                    for (let i = 0; i < images.length; i++) {
                        if (images[i].success) {
                            let range = editor.getSelection();
                            const {
                                index
                            } = editor.getSelection() || {
                                index: 0
                            }
                            editor.insertEmbed(index, 'image', images[i].path, Quill.sources.USER);
                            editor.insertText(index + 1, ' ', Quill.sources.SILENT)
                        } else {
                            vt.error(images[i].message, {
                                position: "bottom-center"
                            });
                        }
                    }
                } catch (e) {
                    vt.error(e.message, {
                        position: "bottom-center"
                    });
                }
                $this.val("");
                $(document).find(".quillImageUploadbtn").attr("disabled", false).html('<i class="fa fa-image"></i>');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(document).find(".quillImageUploadbtn").attr("disabled", false).html('<i class="fa fa-image"></i>');
                vt.error("Unable to upload image. Please try later!!!!", {
                    position: "bottom-center"
                });

                $this.val("");
            }
        });
    })


    $(document).on('change', '.quillPDFUpload', function () {

        const $this = $(this);
        const files = $this[0].files;

        $(document).find(".quillPDFUploadBtn").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i>');

        let form_data = new FormData();
        let totalfiles = files.length;
        let index = 0;
        form_data.append("action", "upload_pdf_editor");
        form_data.append("files[]", files[0]);

        $.ajax({
            url: tucsitnotes.ajax_url,
            type: 'post',
            data: form_data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                try {
                    if (response.success) {
                        let range = editor.getSelection();
                        let finalURL = `https://hamrocsit.com/wp-content/plugins/pdfjs-viewer-hamrocsit/pdfjs/web/viewer.php?file=${response.code}`;
                        const {
                            index
                        } = editor.getSelection() || {
                            index: 0
                        }
                        editor.insertEmbed(index, 'video', finalURL, Quill.sources.USER);
                        editor.insertText(index + 1, ' ', Quill.sources.SILENT)
                    } else {
                        vt.error(response.message, {
                            position: "bottom-center"
                        });
                    }
                } catch (e) {
                    vt.error(e.message, {
                        position: "bottom-center"
                    });
                }
                $this.val("");
                $(document).find(".quillPDFUploadBtn").attr("disabled", false).html('<i class="fa fa-image"></i>');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(document).find(".quillPDFUploadBtn").attr("disabled", false).html('<i class="fa fa-image"></i>');

                vt.error("Unable to upload PDF file. Please try later!!!!", {
                    position: "bottom-center"
                });
                $this.val("");
            }
        });
    })


    $(document).on('click', '.account-info', function () {
        $(document).find(".toggle-account").toggleClass("toggle-message-add");
    })


    $(document).on('click', '#slideMenuRight', function () {
        $('.um-profile-nav').animate({
            scrollLeft: "+=300px"
        }, "slow");
    });

    $(document).on('click', '#slideMenuLeft', function () {
        $('.um-profile-nav').animate({
            scrollLeft: "-=300px"
        }, "slow");
    });

    // removed for performance issue
    // function get_global_views(update = false) {
    //     $.post(tucsitnotes.ajax_url, {
    //         action: "get_hamrocsit_views",
    //         update: update
    //     }).then((res) => {
    //         $(document).find("#hits_counter_wrap").html(res);
    //     })
    // }

    // get_global_views(true);
    setInterval(() => {
        //get_global_views(false);
    }, 10000)

    function can_access_the_question(postid) {


        if (tucsitnotes?.hassubscription && tucsitnotes.hassubscription != '0') {
            return true;
        }

        if (postid && qnbankdata.hasOwnProperty(postid)) {
            const qndata = qnbankdata[postid];
            if (qndata.hasOwnProperty("limit") && qndata?.limit) {
                return true;
            }
        }

        return false;
    }

    const hamrocsit_get_answer = (answer, postid) => {
        try {

            console.log(postid, can_access_the_question(postid));
            if (!can_access_the_question(postid)) {
                let htmlcode = `<div class="hamrocsit_limit_exceed">
                <p>You are using FREE plan. You can't access the question with lock symbol in FREE plan. Please purchase one of the subscription plan to access the answer of these question.</p>
                <a href="https://hamrocsit.com/subscription-plan/" class="btn btn-primary btn-sm">View subscription Plan</a>
            </div>`;
                if (!tucsitnotes.is_user_login) {
                    htmlcode = `<div class="hamrocsit_limit_exceed">
                    <p>This answer is restricted. Please login to view the answer of this question.</p>
                    <a href="https://hamrocsit.com/account/" class="btn btn-primary btn-sm">Login Now</a>
                </div>`;
                }
                return htmlcode;
            }

            if (answer.length > 20) {
                return answer + `<div class="alert alert-info px-3 py-2 mt-4">If you found any type of error on the answer then please mention on the comment or report an answer or <a href="https://hamrocsit.com/submit-answer?qn=${postid}" target="_blank">submit your new answer</a>.</div>`;
            }
        } catch (e) {

        }

        return `<div class="alert alert-danger my-4" role="alert">We cannot find any best answer for this question. Please click on question to get all the answers posted by experts.</div>`;
    }

    function show_qnbank_modal(postid, index) {
        if (postid && qnbankdata.hasOwnProperty(postid)) {
            const data = qnbankdata[postid];
            const modal = $(document).find('#qnbankAnswersModal');
            modal.find('.modal-content-title').html(`<a href="${data?.link}" target="_blank">${data?.title}</a>`);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "modal-content-title"]);

            const answer = data?.answer;
            modal.find('.modal-content-content').html(answer);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "modal-content-content"]);


            //addCompileCode();
            EnlighterJS.init('pre', 'code.highlightme', {
                theme: 'dracula',
                indent: 4
            });

            modal.find('.modal-footer').find(".previous").attr('data-next', parseInt(index) - 1);
            modal.find('.modal-footer').find(".next").attr('data-next', parseInt(index) + 1);
            if (modal.find('.modal-footer').find(".addanswerforqn").length > 0) {
                const adminurl = `https://hamrocsit.com/wp-admin/post-new.php?post_type=answer&question=${postid}&text=${data?.rawtitle}`;
                modal.find('.modal-footer').find(".addanswerforqn").attr("href", adminurl).attr('target', '_blank');
            }
            modal.find('.modal-footer').show();

            if (!modal.hasClass('show')) modal.modal('show');
        }
    }

    $(document).on('click', '.single_question_container, .open_single_queston_modal', function (e) {
        if ($(this).hasAttr("data-id")) {
            e.preventDefault();
            const postid = $(this).attr('data-id');
            const index = $(this).attr('data-index');

            show_qnbank_modal(postid, index);
        }
    });

    $(document).on('click', '.qnbanknextbtn', function () {
        const index = $(this).attr('data-next');
        const keys = Object.keys(qnbankdata);

        if (index < 0) {
            vt.error("This is the first question!!!!", {
                position: "bottom-center"
            });
            return false;
        }

        if (index >= keys.length) {
            vt.error("This is the last question!!!!", {
                position: "bottom-center"
            });
            return false;
        }

        show_qnbank_modal(keys[index], index);
    });


    let downloadcount = false;
    $(document).on("click", "button.downloadfile", function (e) {
        e.preventDefault();

        const prevBtn = $(this);
        const prevHTML = prevBtn.html();
        prevBtn.attr("disabled", true).html("Preparing . . . ");

        const prevLink = $(this).attr('data-id');
        if (prevLink.length > 0) {
            const downloadLink = `https://www.googleapis.com/drive/v3/files/${prevLink}?alt=media&key=AIzaSyBu-bfTWELZCIi975Oi61AKfnRkXEurrlE`;

            let req = new XMLHttpRequest();
            req.open("GET", downloadLink, true);

            req.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    prevBtn.html("Downloading . . . ");
                    const percentComplete = evt.loaded / evt.total;
                    const percentage = Math.round(percentComplete * 1000) / 10;
                    const progressbar = prevBtn.parent().find('.progress');
                    progressbar.show();
                    progressbar.find('.progress-bar').attr('aria-valuenow', percentage).css('width', `${percentage}%`).html(`${percentage}%`);
                }
            };

            req.onerror = function () {
                vt.success("Unable to Download the Application File. Please try again!!!!", {
                    position: "bottom-center"
                });
                prevBtn.attr("disabled", false).html(prevHTML);
                prevBtn.parent().find('.progress').hide();
            };

            req.responseType = "blob";
            req.onload = function () {
                if (req.status == 200) {
                    let filename = "app_" + prevBtn.attr('filename') + "_file.apk";
                    if (typeof window.chrome !== 'undefined') {
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(req.response);
                        link.download = filename;
                        link.click();
                    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        let blob = new Blob([req.response], { type: 'application/force-download' });
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        let file = new File([req.response], filename, { type: 'application/force-download' });
                        window.open(URL.createObjectURL(file));
                    }
                    vt.success("Application Downloaded Successfully. Please check the download instruction!!!!", {
                        position: "bottom-center"
                    });
                    prevBtn.attr("disabled", false).html(prevHTML);
                    prevBtn.parent().find('.progress').hide();
                } else {
                    vt.error("Unable to Download the Application File. Please try again!!!!", {
                        position: "bottom-center"
                    });
                    prevBtn.attr("disabled", false).html(prevHTML);
                    prevBtn.parent().find('.progress').hide();
                }
            };

            req.send();
        }

        return false;
    });

    $(document).on('click', '.hamrocsit_payment_button', function () {
        const value = $(this).attr("data-pay");
        if (value.length > 0) {
            jQuery(document).find(`label[for='payment_method_${value}']`).click();
            $(document).find("#place_order").click();
        }
    });

    const esewa_payment_form = $(document).find("#esewa_payment_form");
    if (esewa_payment_form.length > 0) {
        //esewa_payment_form.submit();
    }
})(jQuery);


const importantquestionslist = jQuery(document).find(".important_questions_list");
function get_important_questions(page = 1) {
    jQuery.ajax({
        type: 'post',
        url: tucsitnotes.ajax_url,
        data: {
            action: 'get_important_questions',
            noteid: importantquestionslist.attr("data-id"),
            page: page
        },
        beforeSend: function (response) {
            importantquestionslist.find(".load_more_impquestions").attr("disabled", true).html('<i class="fa fa-spin fa-spinner"></i>');
        },
        success: function (response) {
            importantquestionslist.find(".load_more_impquestions").attr("disabled", false).html('Load More');
            if (response.success) {
                importantquestionslist.find(".card-body .important_questions_wrap").append(response.html);

                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "load_more_impquestions"]);
                if (qnbankdata) {
                    qnbankdata = response.questions;
                }

                if (!response.hasmore) {
                    importantquestionslist.find(".load_more_impquestions").hide();
                }
            } else {
                if (!(importantquestionslist.find(".hamrocsit_news_card").length > 0)) {
                    importantquestionslist.hide();
                }
            }
        },
        error: function (xhr) {
            if (!(importantquestionslist.find(".hamrocsit_news_card").length > 0)) {
                importantquestionslist.hide();
            }
        }
    });
}
if (importantquestionslist.length > 0) {
    get_important_questions(1);
}

jQuery(document).on("click", ".load_more_impquestions", function () {
    const page = jQuery(this).attr("data-page");
    const newpage = parseInt(page) + 1;
    jQuery(this).attr("data-page", newpage);
    get_important_questions(newpage);
});
