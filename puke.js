window.onload = function() {
    var zhuozi = $('.zhuozi')
        // 存储单张扑克
    var poko = [];
    // s 黑桃 h红桃 c梅花 d 方块
    var color = ['s', 'h', 'c', 'd'];
    // 存储数字 花色 的对象
    var biao = {};
    // 产生扑克
    while (poko.length < 52) {
        // 产生数字
        var shuzi = Math.ceil(Math.random() * 13);
        // 分配花色
        var huase = color[Math.floor(Math.random() * 4)];
        if (!biao[shuzi + '_' + huase]) {
            biao[shuzi + '_' + huase] = true;
            poko.push({
                'huase': huase,
                'shuzi': shuzi
            })
        }
    }

    var dirs = {
        '1': 'A',
        '2': '2',
        '3': '3',
        '4': '4',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': 'T',
        '11': 'J',
        '12': 'Q',
        '13': 'K'
    }


    // 发牌

    // 发到桌上
    for (var i = 0, index = 0; i < 7; i++) {

        for (var j = 0; j < i + 1; j++) {
            index++;
            var item = poko[index];
            // console.log(item)
            var url = 'url(./img/' + dirs[item.shuzi] + item.huase + '.png)';
            $('<div>').addClass('pai').css({ backgroundImage: url })
                // delay 动画延迟  每一个都延迟它自己的30
                .attr('id', i + '_' + j)
                // 存储数字
                .data('num', item.shuzi)
                .appendTo(zhuozi).delay(index * 30)
                .animate({ opacity: 1, top: i * 50, left: (6 - i) * 50 + j * 100 });
        }
    }

    // 桌上发完继续发牌

    // for中的每一项都可以省，但分号不可以省+
    for (; index < poko.length; index++) {
        var item = poko[index];
        var url = 'url(./img/' + dirs[item.shuzi] + item.huase + '.png)';
        $('<div>').addClass('pai zuo').css({ backgroundImage: url })
            // delay 动画延迟  每一个都延迟它自己的30
            .attr('id', index)
            .data('num', item.shuzi)
            .appendTo(zhuozi).delay(index * 30)
            .animate({ opacity: 1, top: 460, left: 160 })
    }

    // 玩

    var first = null; //存第一次点击的扑克牌
    // 点击选中扑克
    $('.pai').click(function() {
        // 得到坐标判断i j
        var coords = $(this).attr('id').split('_');

        var i = Number(coords[0]),
            j = Number(coords[1]);

        // 如果点击元素下面的两个存在，那么不执行任何

        if ($('#' + (i + 1) + '_' + j).length || $('#' + (i + 1) + '_' + (j + 1)).length) {
            return;
        }
        // 是否为13
        if ($(this).data('num') === 13) {
            // queue队列
            $(this).animate({ top: 0, left: 600, opacity: 0 }).queue(function() {
                $(this).remove();
            })
            return;
        }
        // 让图片上下
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).animate({ top: '-=30' })
        } else {
            $(this).animate({ top: '+=30' })
        }

        // 第一次点击
        if (!first) {
            // 第一次点击执行
            first = $(this);
            // console.log(first)
        } else {
            if ($(this).data('num') + first.data('num') === 13) {
                $('.active').each(function(index, obj) {
                    $(obj).animate({ top: 0, left: 600, opacity: 0 }).queue(function() {
                        $(this).remove();
                    })
                });
            } else {
                $('.pai.active').removeClass('active').each(function() {
                    $(this).animate({ top: "+=30" })
                })
            }
            first = null;
        }
    })

    var Zindex = 1;
    $('.zhuozi .move-right').click(function(event) {
        $('.pai.zuo').eq(-1).addClass('you').removeClass('zuo')
            .animate({ left: '+480' }).css('zIndex', ++Zindex);
    });
    var a = 1;
    $('.zhuozi .move-left').click(function(event) {
        $('.pai.you').eq(0).addClass('zuo').removeClass('you')
            .animate({ left: '160' }).queue(function(obj) {
                console.log($(obj))
                $(this).css('zIndex', a++)
            });
    });
}
