(function ($) {
    $.fn.timeline = function () {
        const selectors = {
            id: $(this),
            item: $(this).find(".timeline-item"),
            activeClass: "timeline-item--active",
            img: ".timeline__img",
        };

        // Define o primeiro item como ativo e o background inicial
        selectors.item.eq(0).addClass(selectors.activeClass);
        updateBackground(selectors.item.first());

        const itemLength = selectors.item.length;

        // Função para atualizar o background com a imagem do item ativo
        function updateBackground(item) {
            const imageUrl = item.find(selectors.img).attr("src");
            console.log("Atualizando fundo com a imagem:", imageUrl); // Adiciona log para depuração
            selectors.id.css("background-image", `url(${imageUrl})`);
        }

        // Monitora o scroll e atualiza o item ativo
        $(window).on("scroll", function () {
            const pos = $(this).scrollTop();
            let currentItem = null;

            selectors.item.each(function (i) {
                const min = $(this).offset().top;
                const max = min + $(this).outerHeight();

                if (pos >= min && pos < max) {
                    currentItem = $(this);
                    return false; // Interrompe o loop ao encontrar o item ativo
                }
            });

            if (currentItem && !currentItem.hasClass(selectors.activeClass)) {
                selectors.item.removeClass(selectors.activeClass);
                currentItem.addClass(selectors.activeClass);
                updateBackground(currentItem);
            }
        });
    };
})(jQuery);

// Inicializa a timeline
$("#timeline-1").timeline();


// INDICE
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".timeline-index a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const year = this.getAttribute("data-year");
            // Agora procuramos pelo atributo `year` dentro de cada "timeline-item"
            const target = document.querySelector(`.timeline-item[year="${year}"]`);

            if (target) {
                // Aumenta a distância de rolagem para parar um pouco mais abaixo
                window.scrollTo({
                    top: target.offsetTop + 270,  // Adicionando 150 pixels para descer um pouco mais
                    behavior: "smooth"
                });
            }
        });
    });
});
