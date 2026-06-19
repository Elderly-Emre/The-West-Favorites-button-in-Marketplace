 
Greasy Fork
Elderly-Emre [ Oturumu kapat ] 
Türkçe (tr)
Scriptler Forum Yardım Daha fazla
Bilgi
Kod
Geçmiş
Geribildirim (0)
İstatistikler
Türevleri
Güncelle
Sil
Yönetici
Favorites Marketplace
Favorites button on marketplace

Bu scripti kur?
Bir soru sorun, yorum yayınlayın veya komut dosyasını bildirin.
Satırları kaydır
// ==UserScript==
// @name         Favorites Marketplace
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Favorites button on marketplace
// @author       Elderly
// @include      https://*.the-west.*/game.php*
// @grant        none
// ==/UserScript==
 
(function () {
    'use strict';
 
    // --- 1. DİL SÖZLÜĞÜ (14 DİL) ---
    const translations = {
        tr: { tabText: "Favoriler", title: "⭐ Favori Arama Listesi", placeholder: "Pazarda olmayan ürünün tam adını yazın...", addBtn: "+ Ekle", thItem: "Eşya Adı", thAction: "İşlemler", emptyMsg: "Henüz favori ürün eklemediniz. Yukarıdan yazabilir veya pazardaki ⭐ simgesine tıklayabilirsiniz.", searchBtn: "Pazarda Ara", deleteBtn: "Sil", starTitle: "Favorilere Ekle" },
        en: { tabText: "Favorites", title: "⭐ Favorite Search List", placeholder: "Type the exact item name...", addBtn: "+ Add", thItem: "Item Name", thAction: "Actions", emptyMsg: "No favorites added yet. Type above or click ⭐ in the market.", searchBtn: "Search Market", deleteBtn: "Delete", starTitle: "Add to Favorites" },
        de: { tabText: "Favoriten", title: "⭐ Favoriten-Suchliste", placeholder: "Genauen Namen eingeben...", addBtn: "+ Hinzufügen", thItem: "Gegenstandsname", thAction: "Aktionen", emptyMsg: "Noch keine Favoriten. Oben eingeben oder ⭐ klicken.", searchBtn: "Markt suchen", deleteBtn: "Löschen", starTitle: "Zu Favoriten" },
        pl: { tabText: "Ulubione", title: "⭐ Lista ulubionych", placeholder: "Wpisz dokładną nazwę...", addBtn: "+ Dodaj", thItem: "Nazwa", thAction: "Akcje", emptyMsg: "Brak ulubionych. Wpisz powyżej lub kliknij ⭐ na targu.", searchBtn: "Szukaj", deleteBtn: "Usuń", starTitle: "Dodaj do ulubionych" },
        es: { tabText: "Favoritos", title: "⭐ Lista de favoritos", placeholder: "Escribe el nombre exacto...", addBtn: "+ Añadir", thItem: "Nombre", thAction: "Acciones", emptyMsg: "Sin favoritos. Escribe arriba o haz clic en ⭐.", searchBtn: "Buscar", deleteBtn: "Eliminar", starTitle: "Añadir a favoritos" },
        fr: { tabText: "Favoris", title: "⭐ Liste de favoris", placeholder: "Tapez le nom exact...", addBtn: "+ Ajouter", thItem: "Nom", thAction: "Actions", emptyMsg: "Aucun favori. Tapez ci-dessus ou cliquez sur ⭐.", searchBtn: "Chercher", deleteBtn: "Supprimer", starTitle: "Ajouter aux favoris" },
        hu: { tabText: "Kedvencek", title: "⭐ Kedvencek", placeholder: "Írd be a pontos nevet...", addBtn: "+ Hozzáadás", thItem: "Tárgy neve", thAction: "Műveletek", emptyMsg: "Nincsenek kedvencek. Írd be fent vagy kattints a ⭐ ikonra.", searchBtn: "Keresés", deleteBtn: "Törlés", starTitle: "Kedvencekhez" },
        ru: { tabText: "Избранное", title: "⭐ Список избранных", placeholder: "Введите точное название...", addBtn: "+ Добавить", thItem: "Название", thAction: "Действия", emptyMsg: "Нет избранного. Введите выше или нажмите ⭐.", searchBtn: "Искать", deleteBtn: "Удалить", starTitle: "В избранное" },
        el: { tabText: "Αγαπημένα", title: "⭐ Λίστα Αγαπημένων", placeholder: "Πληκτρολογήστε το ακριβές όνομα...", addBtn: "+ Προσθήκη", thItem: "Όνομα", thAction: "Ενέργειες", emptyMsg: "Δεν υπάρχουν αγαπημένα. Πληκτρολογήστε παραπάνω ή κάντε κλικ στο ⭐.", searchBtn: "Αναζήτηση", deleteBtn: "Διαγραφή", starTitle: "Στα Αγαπημένα" },
        cs: { tabText: "Oblíbené", title: "⭐ Seznam oblíbených", placeholder: "Zadejte přesný název...", addBtn: "+ Přidat", thItem: "Název", thAction: "Akce", emptyMsg: "Žádné oblíbené. Zadejte výše nebo klikněte na ⭐.", searchBtn: "Hledat", deleteBtn: "Smazat", starTitle: "Do oblíbených" },
        sk: { tabText: "Obľúbené", title: "⭐ Zoznam obľúbených", placeholder: "Zadajte presný názov...", addBtn: "+ Pridať", thItem: "Názov", thAction: "Akcie", emptyMsg: "Žiadne obľúbené. Zadajte vyššie alebo kliknite na ⭐.", searchBtn: "Hľadať", deleteBtn: "Vymazať", starTitle: "Do obľúbených" },
        it: { tabText: "Preferiti", title: "⭐ Lista preferiti", placeholder: "Digita il nome esatto...", addBtn: "+ Aggiungi", thItem: "Nome", thAction: "Azioni", emptyMsg: "Nessun preferito. Digita sopra o clicca su ⭐.", searchBtn: "Cerca", deleteBtn: "Elimina", starTitle: "Nei preferiti" },
        pt: { tabText: "Favoritos", title: "⭐ Lista de Favoritos", placeholder: "Digite o nome exato...", addBtn: "+ Adicionar", thItem: "Nome", thAction: "Ações", emptyMsg: "Nenhum favorito. Digite acima ou clique em ⭐.", searchBtn: "Procurar", deleteBtn: "Excluir", starTitle: "Aos favoritos" },
        nl: { tabText: "Favorieten", title: "⭐ Favorietenlijst", placeholder: "Typ de exacte naam...", addBtn: "+ Toevoegen", thItem: "Naam", thAction: "Acties", emptyMsg: "Geen favorieten. Typ hierboven of klik op ⭐.", searchBtn: "Zoeken", deleteBtn: "Verwijderen", starTitle: "Aan favorieten" }
    };
 
    // --- 2. GÜVENLİ HAFIZA YÖNETİMİ ---
    function getLang() {
        const lang = localStorage.getItem('Favoriteslang');
        return translations[lang] ? lang : 'tr';
    }
 
    function setLang(langCode) {
        if (translations[langCode]) {
            localStorage.setItem('Favoriteslang', langCode);
        }
    }
 
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('market_favorites') || '[]');
        } catch (e) {
            return [];
        }
    }
 
    function saveFavorites(favs) {
        localStorage.setItem('market_favorites', JSON.stringify(favs));
    }
 
    function addFavorite(name) {
        let favs = getFavorites();
        if (!favs.includes(name) && name.length > 0) {
            favs.push(name);
            saveFavorites(favs);
        }
    }
 
    function removeFavorite(name) {
        let favs = getFavorites();
        saveFavorites(favs.filter(item => item !== name));
    }
 
    // --- 3. ANA MOTOR (PAZAR AÇIK MI KONTROLÜ) ---
    setInterval(() => {
        const marketWin = $('.tw2gui_window.marketplace');
 
        if (marketWin.length > 0 && marketWin.find('._tab_id_favorites').length === 0) {
            injectFavoritesTab(marketWin);
        }
 
        $('.tw2gui_scrollpane_clipper_contentpane p.accordion_contentRow').each(function() {
            const $row = $(this);
            if (!$row.hasClass('has-fav-star')) {
                $row.addClass('has-fav-star');
 
                $row.css({
                    'width': '330px',
                    'min-width': '330px',
                    'white-space': 'nowrap',
                    'overflow': 'visible'
                });
 
                const itemName = $row.text().replace(/[⭐☆]/g, '').trim();
                const currentLang = getLang();
 
                const $star = $(`<span style="cursor: pointer; margin-right: 6px; font-size: 13px; color: #3e2712;" title="${translations[currentLang].starTitle}">⭐</span>`);
 
                $star.click(function(e) {
                    e.stopPropagation();
                    addFavorite(itemName);
 
                    $row.css('background-color', '#c1ecc1');
                    setTimeout(() => { $row.css('background-color', ''); }, 400);
                });
 
                $row.prepend($star);
            }
        });
    }, 500);
 
    // --- 4. SEKME VE PANEL OLUŞTURUCU ---
    function injectFavoritesTab(marketWin) {
        const tabbar = marketWin.find('.tw2gui_window_tabbar_tabs');
        const currentLang = getLang();
 
        const favTab = $(`
            <div class="tw2gui_window_tab _tab_id_favorites">
                <div class="loader"></div>
                <div class="tw2gui_window_tab_text">${translations[currentLang].tabText}</div>
                <div class="tw2gui_window_tab_terminator"></div>
            </div>
        `);
 
        tabbar.append(favTab);
 
        const contentPane = marketWin.find('.tw2gui_window_content_pane');
        const favPane = $('<div class="marketplace-favorites" style="display: none; padding: 15px; height: 100%; box-sizing: border-box; overflow-y: auto; background: #ebd3ad; color: #3e2712;"></div>');
        contentPane.append(favPane);
 
        favTab.click(function() {
            marketWin.find('.tw2gui_window_tab').removeClass('tw2gui_window_tab_active');
            favTab.addClass('tw2gui_window_tab_active');
 
            marketWin.removeClass(function (index, className) {
                return (className.match (/(^|\s)active_tab_id_\S+/g) || []).join(' ');
            }).addClass('active_tab_id_favorites');
 
            marketWin.find('.marketplace-whatishot, .marketplace-buy, .marketplace-sell, .marketplace-offer, .marketplace-watchlist').hide();
 
            favPane.show();
            renderFavoritesList(favPane, marketWin);
        });
 
        marketWin.find('.tw2gui_window_tab:not(._tab_id_favorites)').click(function() {
            favTab.removeClass('tw2gui_window_tab_active');
            favPane.hide();
        });
    }
 
    // --- 5. LİSTE VE ARAYÜZ ÇİZİCİ ---
    function renderFavoritesList(favPane, marketWin) {
        favPane.empty();
 
        const currentLang = getLang();
        const t = translations[currentLang];
 
        const headerRow = $('<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #5a3a1a; padding-bottom: 5px; margin-bottom: 12px;"></div>');
        const title = $(`<h2 style="margin: 0; font-size: 13px; font-weight: bold; color: #3e2712;">${t.title}</h2>`);
 
        const langContainer = $('<div style="display: flex; align-items: center;"></div>');
        const langLabel = $('<span style="font-size: 11px; font-weight: bold; color: #3e2712; margin-right: 6px;">🌐 Language:</span>');
 
        const langSelect = $(`
            <select style="cursor: pointer; background: #fff3db; border: 1px solid #5a3a1a; color: #3e2712; font-size: 11px; font-weight: bold; padding: 2px 4px; border-radius: 3px; outline: none;">
                <option value="tr">TR - Türkçe</option>
                <option value="en">EN - English</option>
                <option value="de">DE - Deutsch</option>
                <option value="pl">PL - Polski</option>
                <option value="es">ES - Español</option>
                <option value="fr">FR - Français</option>
                <option value="hu">HU - Magyar</option>
                <option value="ru">RU - Русский</option>
                <option value="el">EL - Ελληνικά</option>
                <option value="cs">CS - Čeština</option>
                <option value="sk">SK - Slovenčina</option>
                <option value="it">IT - Italiano</option>
                <option value="pt">PT - Português</option>
                <option value="nl">NL - Nederlands</option>
            </select>
        `);
 
        langSelect.val(currentLang);
 
        langContainer.append(langLabel).append(langSelect);
        headerRow.append(title).append(langContainer);
        favPane.append(headerRow);
 
        langSelect.change(function() {
            setLang($(this).val());
            marketWin.find('._tab_id_favorites .tw2gui_window_tab_text').text(translations[$(this).val()].tabText);
            renderFavoritesList(favPane, marketWin);
        });
 
        const inputArea = $(`<div style="margin-bottom: 15px; padding: 10px; background: #fff3db; border: 1px solid #5a3a1a; border-radius: 4px; box-sizing: border-box;">
            <input type="text" class="manual-fav-input" placeholder="${t.placeholder}" style="width: 75%; padding: 5px; border: 1px solid #5a3a1a; background: #fff; color: #3e2712; font-size: 12px; font-weight: bold; border-radius: 3px;">
            <button class="manual-fav-add-btn" style="cursor: pointer; width: 20%; margin-left: 3%; padding: 5px 0; background: #5a3a1a; border: 1px solid #3e2712; border-radius: 3px; font-weight: bold; color: #ffda96; font-size: 11px;">${t.addBtn}</button>
        </div>`);
        favPane.append(inputArea);
 
        inputArea.find('.manual-fav-add-btn').click(function() {
            const txtInput = inputArea.find('.manual-fav-input');
            const itemName = txtInput.val().trim();
            if (itemName) {
                addFavorite(itemName);
                renderFavoritesList(favPane, marketWin);
            }
        });
 
        inputArea.find('.manual-fav-input').keypress(function(e) {
            if (e.which === 13) inputArea.find('.manual-fav-add-btn').click();
        });
 
        const table = $('<table style="width: 100%; border-collapse: collapse; background: #fff3db; border: 1px solid #5a3a1a; font-size: 12px;"></table>');
 
        // DÜZELTİLEN KISIM: white-space: nowrap eklendi ve width genişletildi/esnetildi.
        const thead = $(`<thead style="background: #5a3a1a; color: #ffda96; font-weight: bold;"><tr><th style="padding: 8px; text-align: left;">${t.thItem}</th><th style="padding: 8px; width: 180px; white-space: nowrap; text-align: center;">${t.thAction}</th></tr></thead>`);
        const tbody = $('<tbody></tbody>');
        table.append(thead).append(tbody);
 
        const FAVORITE_ITEMS = getFavorites();
 
        if (FAVORITE_ITEMS.length === 0) {
            tbody.append(`<tr><td colspan='2' style='padding: 15px; text-align: center; color: #7a6146; font-style: italic;'>${t.emptyMsg}</td></tr>`);
        } else {
            FAVORITE_ITEMS.sort((a, b) => a.localeCompare(b, currentLang, { sensitivity: 'base' }));
 
            FAVORITE_ITEMS.forEach(itemName => {
                const row = $(`<tr style="border-bottom: 1px solid #dfbe91;">
                    <td style="padding: 8px; font-weight: bold; color: #3e2712; vertical-align: middle;">${itemName}</td>
 
                    <!-- DÜZELTİLEN KISIM: Sütun içine white-space: nowrap eklendi -->
                    <td style="padding: 8px; text-align: center; vertical-align: middle; white-space: nowrap;">
                        <button class="fav-search-btn" style="cursor: pointer; padding: 4px 8px; background: #c5a478; border: 1px solid #5a3a1a; border-radius: 3px; font-weight: bold; color: #3e2712; font-size: 11px; margin-right: 4px;">${t.searchBtn}</button>
                        <button class="fav-delete-btn" style="cursor: pointer; padding: 4px 8px; background: #d9534f; border: 1px solid #d43f3a; border-radius: 3px; font-weight: bold; color: #fff; font-size: 11px;">${t.deleteBtn}</button>
                    </td>
                </tr>`);
 
                row.find('.fav-search-btn').click(function() {
                    marketWin.find('._tab_id_buy').click();
                    setTimeout(() => {
                        const searchInput = marketWin.find('.marketplace-buy input[name="market_search_search"]');
                        if (searchInput.length) {
                            searchInput.val(itemName);
                            searchInput.trigger('input').trigger('keyup').trigger('change');
                            marketWin.find('.marketplace-buy .butSearchbox').click();
                            marketWin.find('.marketplace-buy .iconBut_mpb_refresh').click();
                        }
                    }, 150);
                });
 
                row.find('.fav-delete-btn').click(function() {
                    removeFavorite(itemName);
                    renderFavoritesList(favPane, marketWin);
                });
 
                tbody.append(row);
            });
        }
 
        table.append(tbody);
        favPane.append(table);
    }
 
})();
