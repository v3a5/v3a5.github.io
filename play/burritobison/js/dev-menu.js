(function () {
  function waitForGame() {
    return typeof window.gameInstance !== "undefined" && window.gameInstance;
  }

  function tryUnitySendMessage(amount) {
    const candidates = [
      // Fill these in once you discover the actual names
      ["GameManager", "AddCoins"],
      ["GameManager", "SetCoins"],
      ["Managers", "AddCoins"],
      ["Managers", "SetCoins"],
      ["MetaGame", "AddCoins"],
      ["MetaGame", "SetCoins"],
      ["CoinManager", "AddCoins"],
      ["CoinManager", "SetCoins"],
    ];

    for (const [objectName, methodName] of candidates) {
      try {
        window.gameInstance.SendMessage(objectName, methodName, String(amount));
        console.log(`[DEV MENU] Tried ${objectName}.${methodName}(${amount})`);
        return true;
      } catch (err) {
        // keep trying
      }
    }

    return false;
  }

  function openDevPrompt() {
    const raw = prompt("Give how many coins?");
    if (raw == null) return;

    const amount = Number(raw);
    if (!Number.isFinite(amount) || amount < 0) {
      alert("Invalid number");
      return;
    }

    const ok = tryUnitySendMessage(Math.floor(amount));

    if (!ok) {
      console.warn(
        "[DEV MENU] No known Unity receiver matched. You still need the correct object/method name."
      );
      alert(
        "Dev menu opened, but the coin function is still a placeholder.\nCheck console for details."
      );
    }
  }

  window.devMenu = {
    coins(amount) {
      amount = Number(amount);
      if (!Number.isFinite(amount) || amount < 0) {
        throw new Error("coins(amount): amount must be a non-negative number");
      }

      if (!waitForGame()) {
        throw new Error("Game is not loaded yet.");
      }

      const ok = tryUnitySendMessage(Math.floor(amount));
      if (!ok) {
        throw new Error(
          "No working Unity receiver found yet. Need actual object/method names."
        );
      }
    },
    open: openDevPrompt,
  };

  document.addEventListener("keydown", (e) => {
    // Ctrl+Shift+~
    if (e.ctrlKey && e.shiftKey && e.key === "~") {
      e.preventDefault();
      openDevPrompt();
    }
  });

  console.log(
    "[DEV MENU] Ready. Use devMenu.open() or devMenu.coins(12345) after the game loads."
  );
})();
