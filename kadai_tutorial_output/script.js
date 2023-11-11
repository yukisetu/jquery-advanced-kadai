$(function () {
    $('.button-more').on('mouseover', function(){
        $(this).animate({
            opacity: 0.5,
            marginLeft: 20,
        }, 100);
    });

    $('.button-more').on('mouseout', function() {
        $(this).animate({
            marginLeft: 0,
            opacity: 1,

        }, 100);
     });

     //　カルーセル
     $('.carousel').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        arrows: false,
     });

     //AjaxでSTATIC FORMSにデータを送信
     $('#submit').on('click', function (event) {
        // formタグによる送信の拒否
        event.preventDefault()

        // 入力チェックをした結果、エラーがあるかないかを判定
        let result = inputCheck();

        //エラー判定とメッセージを取得
        let error = result.error;
        let message = result.message;

        //　エラーが無かったらフォームを送信
        if (error == false) {
            //Ajaxでformを送信
            $.ajax({
                url: 'https://api.staticforms.xyz/submit',
                type: 'POST',
                dataType: 'json',
                data: $('#form').serialize(),
                success: function (result) {
                    alert('お問い合わせを送信しました')
                },
                error: function (xhr, resp, text) {
                    alert('お問い合わせを送信できませんでした')
                }
            })
        } else {
            //エラーメッセージを表示
            alert(message);
        }
     });

     // フォーカスが外れたとき(blur)にフォームの入力チェックをする
     $('#name').blur(function () {
        inputCheck();
     });
     $('#furigana').blur(function () {
        inputCheck();
     });
     $('#email').blur(function () {
        inputCheck();
     });
     $('#tel').blur(function () {
        inputCheck();
     });
     $('#massage').blur(function () {
        inputCheck();
     });
     $('#agree').blur(function () {
        inputCheck();
     });

     //お問い合わせフォームの入力チェック
     function inputCheck() {
        //エラーのチェック結果
        let result;

        //エラーメッセージのテキスト
        let message= '';

        //エラーがなければfalse、エラーがあればtrue
        let error = false;

        //お名前のチェック
        if($('#name').val() == ''){
            //エラーあり
            $('#name').css('background-color', '#f79999');
            error = true;
            message += 'お名前を入力してください。\n';
        } else {
            //エラーなし
            $('#name').css('background-color', '#fafafa');
        }

        //フリガナのチェック
        if($('#furigana').val() == ''){
            //エラーあり
            $('#furigana').css('background-color', '#f79999');
            error = true;
            message += 'フリガナを入力してください。\n';
        } else {
            //エラーなし
            $('#furigana').css('background-color', '#fafafa');
        }

        //お問い合わせのチェック
        if($('#message').val() == ''){
            //エラーあり
            $('#message').css('background-color', '#f79999');
            error = true;
            message += 'お問い合わせ内容を入力してください。\n';
        } else {
            //エラーなし
            console.log("エラーなし")
            $('#message').css('background-color', '#fafafa');
        }

        //メールアドレスのチェック
        if($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val(). indexOf('.') == -1) {
            //エラーあり
            $('#email').css('background-color', '#f79999');
            error = true;
            message += 'お問い合わせ内容を入力してください。\n';
        } else {
            //エラーなし
            $('#email').css('background-color', '#fafafa');
        }

        //電話番号のチェック（未入力はOK、未入力ではない場合は-が必要）
        if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
            //エラーあり
            $('#tel').css('background-color', '#f79999');
            error = true;
            message += '電話番号に「-」が含まれていません。\n';
        } else {
            //エラーなし
            $('#tel').css('background-color', '#fafafa');
        }

        //個人情報のチェックボックスのチェック
        if ($('#agree').prop('checked') == false) {
            error = true;
            message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
        }

        //エラーの有無で送信ボタンを切り替え
        if (error == true) {
            $('#submit').attr('src', 'images/button-submit.png');
        } else {
            $('#submit').attr('src', 'images/button-submit-blue.png');
        }

        //オブジェクトでエラー判定とメッセージを返す
        result = {
            error: error,
            message: message
        }

        //戻り値としてエラーがあるかどうかを返す
        return result;

     }
});