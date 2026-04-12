# 我的部落格自動發佈文章。然後悄無聲息地停擺了三星期。

我建立了一條自動化內容管線。每逢星期一上午十時，一個 AI 代理會掃描過去三十天的客戶工作紀錄，挑選最佳題材，以我的語氣撰寫初稿，發佈到個人網站，同步推送到 Substack，再用 WhatsApp 發送中文通知給我。全程無需人工介入。

這套系統運作了數月。47 篇文章。案例分析、方法論拆解、Claude Code 教學。自動管線是我整個內容運營中最穩定的一環。

然後它停了。連續三星期，沒有新文章發佈。沒有錯誤通知。沒有警報。沒有任何跡象顯示出了問題。系統每次執行都回報成功。

## 發生了什麼事

管線以 macOS LaunchAgent 形式運行——一個按時觸發的排程腳本，每週一自動執行。腳本以 `timeout` 指令包裹 Claude Code CLI，防止進程失控：

```bash
timeout 600 claude -p "This is Ada's autonomous blog pipeline..."
```

問題在於：macOS 原生不附帶 GNU `timeout`。這個指令屬於 `coreutils` 套件，需要透過 Homebrew 安裝。在三月十六日至二十三日之間的某個時間點，我把 timeout 包裹器加進了腳本。我在終端機中測試過——PATH 裏有 `coreutils`，一切正常。

但 `launchd` 不會繼承你的 shell PATH。當排程任務觸發時，它遇到了：

```
timeout: command not found
```

然後退出。退出碼為 0。因為在 bash 中，管線第一個指令找不到時，預設不會將錯誤狀態向後傳遞。腳本繼續執行到最後一行：

```bash
echo "=== Blog scan finished (exit: 0) ==="
```

連續三個星期一，腳本啟動，在一秒內失敗，回報成功，然後繼續休眠。

## 為什麼我沒有察覺

三個獨立因素疊加在一起：

**退出碼撒了謊。** LaunchAgent 依靠退出碼判斷執行結果。Exit 0 代表成功。系統以為一切正常。

**成功才會通知。** WhatsApp 通知只在成功發佈後觸發。沒有發佈就沒有通知。但沉默本身是正常狀態——管線在找不到適合題材時會合法地跳過該週。因此「沒有通知」不構成警訊。

**手動操作掩蓋了空白。** 在那三週裏，我在互動式 Claude Code 工作階段中手動發佈了四篇文章。部落格一直有新內容。我沒有注意到自動管線已經死亡，因為我自己在做它的工作。

## 修復方案

三項修改，分別對應三個失敗模式：

**1. 改用 `gtimeout`。** Homebrew 在 macOS 上以 `g` 前綴安裝 GNU 工具。正確的指令是 `gtimeout`，不是 `timeout`。安裝 coreutils 後更新了兩個腳本。

**2. 加入預飛檢查，失敗時大聲告警。**

```bash
for cmd in gtimeout claude; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "PREFLIGHT FAIL: $cmd not found" >&2
    terminal-notifier -title "Ada Blog Pipeline" \
      -message "PREFLIGHT FAIL: $cmd missing" -sound Basso
    exit 1
  fi
done
```

若任何依賴項缺失，腳本以退出碼 1（而非 0）結束，同時觸發 macOS 原生通知。通知是「不可能失敗」的通道——不依賴 WhatsApp、電郵或任何外部服務。

**3. 用 Exit 1 取代 Exit 0。** 預飛檢查使用 `exit 1`，令 launchd 正確標記執行失敗。`launchctl list` 現在顯示真實的退出狀態。

## 自動化系統的教訓

失敗模式不是「程式壞了」，而是「程式壞了卻靜靜地回報成功」。這比崩潰更危險。崩潰會引起注意。一個回報成功的靜默失敗可以持續數週而無人知曉。

我現在為所有自動化管線遵循三個原則：

**預飛檢查所有依賴項。** 不要假設運行環境與開發環境一致。在使用外部指令前逐一檢查。在開始時失敗，而非在中途。

**大聲失敗，而非安靜失敗。** Exit 0 應意味著「我確實完成了任務」，而非「我沒有崩潰」。如果管線未產生輸出，那就是失敗。以失敗對待之。

**為缺席建立通知，而非僅為出席。** 我在文章發佈時收到 WhatsApp。我也應該在星期一過去而沒有發佈時收到通知。沉默應該是訊號，而非預設。

修復後管線已穩定運行。明天是星期一。我們拭目以待。

---

*本文是 Claude Code 自動化系列的延續。上一篇：[Claude Code 完全攻略：完整藍圖](/blog/claude-code-mastery-part-5-full-blueprint-tc)。*
