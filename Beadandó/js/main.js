$(document).ready(function() {
    $('header').css('border-bottom', '5px solid #002a00');

    $('.container').css('box-shadow', '0 0 10px rgba(0,0,0,0.1)');

    $('#main-footer').on('click', function() {
        console.log('A láblécre kattintottak.');
    });

    if ($('#playBtn').length) {
        const video = document.getElementById('fociVideo');
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const skipBtn = document.getElementById('skipBtn');

        playBtn.addEventListener('click', function() {
            video.play();
        });

        pauseBtn.addEventListener('click', function() {
            video.pause();
        });

        $("#skipBtn").on("click", function() {
            if (video.duration) {
                video.currentTime = Math.min(video.currentTime + 10, video.duration);
            }
        });
    }
    
    $('#show-gallery-btn').on('click', function() {
        $('.gallery-item').each(function(index) {
            $(this).delay(300 * index).fadeIn(1000);
        });

        $(this).hide();
    });

    $('#load-teams-btn').on('click', function() {
        $.ajax({
            url: 'data/csapatok.json',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('JSON adatok sikeresen betöltve:', data);
                
                $('#teams-container').empty();
                
                let title = $('<h2></h2>').text(data.bajnoksag);
                $('#teams-container').append(title);

                $.each(data.csapatok, function(index, csapat) {
                    let teamCard = `
                        <div class="team-card">
                            <h3>${csapat.nev} (Alapítva: ${csapat.alapitva})</h3>
                            <p>Város: ${csapat.varos}</p>
                            <p>Kulcsjátékosok: ${csapat.jatekosok.join(', ')}</p>
                        </div>
                    `;
                    $('#teams-container').append(teamCard);
                });
                
                $('#load-teams-btn').hide();
            },
            error: function(xhr, status, error) {
                console.error('Hiba történt az AJAX kérés során:', status, error);
                $('#teams-container').html('<p class="error-msg">Hiba a csapatok betöltése közben. Ellenőrizd a konzolt!</p>');
            }
        });
    });

    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        $('.error-msg').text('');
        $('input.error, textarea.error').removeClass('error');

        let nevInput = $('#nev');
        if (nevInput.val().trim() === '') {
            isValid = false;
            nevInput.addClass('error');
            nevInput.next('.error-msg').text('A név megadása kötelező.');
        }

        let uzenetInput = $('#uzenet');
        if (uzenetInput.val().trim().length < 10) {
            isValid = false;
            uzenetInput.addClass('error');
            uzenetInput.next('.error-msg').text('Az üzenetnek legalább 10 karakter hosszúnak kell lennie.');
        }

        if (isValid) {
            alert('Űrlap sikeresen validálva! (A valóságban itt menne a küldés)');

            let successMessage = $('<p></p>').text('Köszönjük a megkeresést!').css('color', 'green');
            $(this).prepend(successMessage);
        } else {
            alert('Az űrlap hibákat tartalmaz. Kérlek, javítsd őket.');
        }
    });
});