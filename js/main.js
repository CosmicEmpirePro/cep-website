(function () {
  const STORAGE_KEY = "cep-player-v1";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  let revealObserver = null;
  let playlist = [];
  let pageTracks = [];
  let trackIndex = -1;
  let playRequest = 0;

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function writeState(partial) {
    const current = readState() || {};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.assign({}, current, partial)));
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  function closeMobileNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  function bindReveals() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
      );
      revealItems.forEach(function (el) {
        el.classList.remove("is-visible");
        revealObserver.observe(el);
      });
    } else {
      revealItems.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  function bindContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const subject = form.querySelector("#subject").value.trim() || "Project inquiry";
      const message = form.querySelector("#message").value.trim();
      const body = ["Name: " + name, "Email: " + email, "", message].join("\n");
      window.location.href =
        "mailto:cosmicempireproductions@gmail.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  function updateYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function updateNavCurrent(url) {
    if (!nav) return;
    const path = new URL(url, window.location.href).pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach(function (link) {
      const href = (link.getAttribute("href") || "").split("/").pop();
      if (href === path) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function isInternalNavLink(anchor) {
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return false;
    }
    if (url.origin !== window.location.origin) return false;
    if (!/\.html?$/i.test(url.pathname) && !/\/$/.test(url.pathname)) return false;
    return true;
  }

  // --- Persistent player (created once, never destroyed on soft nav) ---
  // Browser reload starts fresh — clear any prior session so the bar stays hidden
  sessionStorage.removeItem(STORAGE_KEY);
  playlist = [];
  trackIndex = -1;

  const bar = document.createElement("div");
  bar.className = "player-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Music player");
  bar.innerHTML =
    '<div class="player-bar-inner">' +
    '<div class="player-transport">' +
    '<button type="button" class="player-prev" aria-label="Previous track">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h2v12H5V6zm14 0v12L9 12l10-6z"/></svg>' +
    "</button>" +
    '<button type="button" class="player-toggle" aria-label="Play">' +
    '<svg class="player-icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
    '<svg class="player-icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>' +
    "</button>" +
    '<button type="button" class="player-next" aria-label="Next track">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6v12l10-6L5 6zm12 0h2v12h-2V6z"/></svg>' +
    "</button>" +
    "</div>" +
    '<div class="player-meta">' +
    '<p class="player-title">Select a track from Portfolio</p>' +
    '<p class="player-pack"></p>' +
    "</div>" +
    '<div class="player-progress">' +
    '<span class="player-time player-current">0:00</span>' +
    '<input type="range" class="player-seek" min="0" max="1000" value="0" step="1" aria-label="Seek">' +
    '<span class="player-time player-duration">0:00</span>' +
    "</div>" +
    '<div class="player-volume">' +
    '<button type="button" class="player-mute" aria-label="Mute">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 5V4L9 9H5zm11.5 3a4.5 4.5 0 0 0-2.3-3.9v7.8A4.5 4.5 0 0 0 16.5 12z"/></svg>' +
    "</button>" +
    '<input type="range" class="player-vol" min="0" max="100" value="80" step="1" aria-label="Volume">' +
    "</div>" +
    '<button type="button" class="player-exit" aria-label="Close player">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
    "</button>" +
    "</div>";
  document.body.appendChild(bar);

  const audio = new Audio();
  audio.preload = "auto";
  const toggleBtn = bar.querySelector(".player-toggle");
  const prevBtn = bar.querySelector(".player-prev");
  const nextBtn = bar.querySelector(".player-next");
  const titleEl = bar.querySelector(".player-title");
  const packEl = bar.querySelector(".player-pack");
  const currentEl = bar.querySelector(".player-current");
  const durationEl = bar.querySelector(".player-duration");
  const seekEl = bar.querySelector(".player-seek");
  const volEl = bar.querySelector(".player-vol");
  const muteBtn = bar.querySelector(".player-mute");
  const exitBtn = bar.querySelector(".player-exit");
  let playerVisible = false;

  function showPlayer() {
    if (playerVisible) return;
    playerVisible = true;
    bar.classList.add("is-visible");
    document.body.classList.add("has-player-bar");
    persist({ playerVisible: true });
  }

  function hidePlayer() {
    audio.pause();
    setPlayingUI(false);
    try {
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}
    trackIndex = -1;
    playerVisible = false;
    bar.classList.remove("is-visible", "is-playing", "is-loading");
    document.body.classList.remove("has-player-bar");
    seekEl.value = "0";
    currentEl.textContent = "0:00";
    durationEl.textContent = "0:00";
    updateMeta();
    syncTrackButtons();
    persist({ playerVisible: false, playing: false, time: 0, index: -1 });
  }

  function setPlayingUI(isPlaying) {
    bar.classList.toggle("is-playing", isPlaying);
    toggleBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    syncTrackButtons();
  }

  function setLoadingUI(isLoading) {
    bar.classList.toggle("is-loading", isLoading);
  }

  function syncTrackButtons() {
    pageTracks.forEach(function (t, i) {
      t.el.classList.toggle("is-playing", i === trackIndex && !audio.paused);
      t.el.classList.toggle("is-active", i === trackIndex);
    });
  }

  function updateMeta() {
    if (trackIndex < 0 || !playlist[trackIndex]) {
      titleEl.textContent = "Select a track from Portfolio";
      packEl.textContent = "";
      bar.classList.remove("has-track");
      return;
    }
    bar.classList.add("has-track");
    titleEl.textContent = playlist[trackIndex].title;
    packEl.textContent = playlist[trackIndex].pack || "";
  }

  function persist(extra) {
    writeState(
      Object.assign(
        {
          index: trackIndex,
          time: audio.currentTime || 0,
          volume: audio.volume,
          muted: audio.muted,
          playing: !audio.paused,
          playlist: playlist,
          playerVisible: playerVisible
        },
        extra || {}
      )
    );
  }

  function waitForCanPlay(timeoutMs) {
    if (audio.readyState >= 3) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error("timeout"));
      }, timeoutMs || 60000);

      function cleanup() {
        clearTimeout(timer);
        audio.removeEventListener("canplay", onReady);
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("loadeddata", onReady);
        audio.removeEventListener("error", onError);
      }

      function onReady() {
        if (settled) return;
        if (audio.readyState < 2) return;
        settled = true;
        cleanup();
        resolve();
      }

      function onError() {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error("media"));
      }

      audio.addEventListener("canplay", onReady);
      audio.addEventListener("canplaythrough", onReady);
      audio.addEventListener("loadeddata", onReady);
      audio.addEventListener("error", onError);
    });
  }

  function loadTrack(index, options) {
    options = options || {};
    if (!playlist.length || index < 0 || index >= playlist.length) return Promise.reject();
    const item = playlist[index];
    const encoded = encodeURI(item.src);
    const same = trackIndex === index && audio.src && audio.src.indexOf(encoded.replace(/^\.\//, "")) !== -1;
    trackIndex = index;
    updateMeta();
    syncTrackButtons();
    persist({ index: index });

    if (same && !options.force) return Promise.resolve();

    setLoadingUI(true);
    packEl.textContent = (item.pack || "") + (options.autoplay ? " · Loading…" : "");
    audio.src = encoded;
    return waitForCanPlay(60000).then(function () {
      setLoadingUI(false);
      updateMeta();
      if (typeof options.time === "number" && options.time > 0 && isFinite(audio.duration)) {
        audio.currentTime = Math.min(options.time, Math.max(audio.duration - 0.25, 0));
      }
    });
  }

  function playCurrent() {
    const token = ++playRequest;
    if (trackIndex < 0) {
      if (!playlist.length) {
        softNavigate("portfolio.html");
        return Promise.reject();
      }
      return loadTrack(0, { autoplay: true }).then(function () {
        if (token !== playRequest) return;
        return audio.play();
      });
    }
    setLoadingUI(true);
    return waitForCanPlay(60000)
      .then(function () {
        if (token !== playRequest) return null;
        return audio.play();
      })
      .then(function () {
        if (token !== playRequest) return;
        setLoadingUI(false);
        setPlayingUI(true);
        persist({ playing: true });
      })
      .catch(function () {
        if (token !== playRequest) return;
        setLoadingUI(false);
        setPlayingUI(false);
        packEl.textContent = "Still loading — press play again";
      });
  }

  function pauseCurrent() {
    audio.pause();
    setPlayingUI(false);
    persist({ playing: false, time: audio.currentTime });
  }

  function updateTransportState() {
    const hasList = playlist.length > 0;
    prevBtn.disabled = !hasList;
    nextBtn.disabled = !hasList;
    toggleBtn.disabled = false;
  }

  function skipTo(index) {
    if (!playlist.length) {
      softNavigate("portfolio.html");
      return;
    }
    const next = ((index % playlist.length) + playlist.length) % playlist.length;
    const shouldPlay = !audio.paused || trackIndex < 0;
    loadTrack(next, { autoplay: shouldPlay, time: 0, force: true })
      .then(function () {
        if (shouldPlay) return audio.play();
      })
      .then(function () {
        if (shouldPlay) {
          setPlayingUI(true);
          persist({ playing: true, time: 0 });
        } else {
          setPlayingUI(false);
          persist({ playing: false, time: 0 });
        }
      })
      .catch(function () {
        setPlayingUI(false);
        packEl.textContent = "Still loading — press play again";
      });
  }

  function goPrev() {
    if (!playlist.length) {
      softNavigate("portfolio.html");
      return;
    }
    // If more than 3s into the track, restart it; otherwise go to previous
    if (audio.currentTime > 3 && trackIndex >= 0) {
      audio.currentTime = 0;
      persist({ time: 0 });
      return;
    }
    skipTo(trackIndex < 0 ? 0 : trackIndex - 1);
  }

  function goNext() {
    if (!playlist.length) {
      softNavigate("portfolio.html");
      return;
    }
    skipTo(trackIndex < 0 ? 0 : trackIndex + 1);
  }

  toggleBtn.addEventListener("click", function () {
    if (!playerVisible) return;
    if (!playlist.length) {
      softNavigate("portfolio.html");
      return;
    }
    if (audio.paused) playCurrent();
    else pauseCurrent();
  });

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  exitBtn.addEventListener("click", hidePlayer);
  updateTransportState();

  seekEl.addEventListener("input", function () {
    if (!audio.duration) return;
    audio.currentTime = (Number(seekEl.value) / 1000) * audio.duration;
    persist({ time: audio.currentTime });
  });

  volEl.addEventListener("input", function () {
    audio.volume = Number(volEl.value) / 100;
    audio.muted = audio.volume === 0;
    muteBtn.classList.toggle("is-muted", audio.muted);
    persist({ volume: audio.volume, muted: audio.muted });
  });

  muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteBtn.classList.toggle("is-muted", audio.muted);
    persist({ muted: audio.muted });
  });

  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    currentEl.textContent = formatTime(audio.currentTime);
    if (!seekEl.matches(":active")) {
      seekEl.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    }
    if (!audio.paused) persist({ time: audio.currentTime, playing: true });
  });

  audio.addEventListener("loadedmetadata", function () {
    if (isFinite(audio.duration)) durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("playing", function () {
    setLoadingUI(false);
    setPlayingUI(true);
    updateMeta();
  });

  audio.addEventListener("pause", function () {
    setPlayingUI(false);
  });

  audio.addEventListener("waiting", function () {
    if (!audio.paused) {
      setLoadingUI(true);
      packEl.textContent =
        (playlist[trackIndex] && playlist[trackIndex].pack ? playlist[trackIndex].pack + " · " : "") +
        "Buffering…";
    }
  });

  audio.addEventListener("ended", function () {
    if (trackIndex >= 0 && trackIndex < playlist.length - 1) {
      loadTrack(trackIndex + 1, { autoplay: true, time: 0 })
        .then(function () {
          return audio.play();
        })
        .then(function () {
          setPlayingUI(true);
          persist({ playing: true, time: 0 });
        })
        .catch(function () {
          setPlayingUI(false);
        });
    } else {
      setPlayingUI(false);
      seekEl.value = "0";
      currentEl.textContent = "0:00";
      persist({ playing: false, time: 0 });
    }
  });

  function collectPlaylistFromPage() {
    pageTracks = Array.prototype.slice.call(document.querySelectorAll(".track[data-src]")).map(function (el, index) {
      const titleNode = el.querySelector(".track-meta h3");
      const title = titleNode ? titleNode.textContent.replace(/^\s*\d+\s*/, "").trim() : "Track";
      const packNode = el.closest(".pack") && el.closest(".pack").querySelector(".pack-head h2");
      return {
        src: el.getAttribute("data-src"),
        title: title,
        pack: packNode ? packNode.textContent.trim() : "Portfolio",
        el: el,
        index: index
      };
    });

    if (pageTracks.length) {
      playlist = pageTracks.map(function (t) {
        return { src: t.src, title: t.title, pack: t.pack };
      });
      writeState({ playlist: playlist });
      updateTransportState();
    }

    pageTracks.forEach(function (track) {
      const localSeek = track.el.querySelector(".track-progress");
      if (localSeek) localSeek.hidden = true;
      const playBtn = track.el.querySelector(".track-play");
      if (!playBtn) return;
      playBtn.addEventListener("click", function () {
        showPlayer();
        const same = trackIndex === track.index && !!audio.src;
        if (same && !audio.paused) {
          pauseCurrent();
          return;
        }
        loadTrack(track.index, { autoplay: true, time: same ? audio.currentTime : 0, force: !same })
          .then(function () {
            return audio.play();
          })
          .then(function () {
            setPlayingUI(true);
            persist({ playing: true });
          })
          .catch(function () {
            setPlayingUI(false);
            packEl.textContent = "Still loading — press play again";
          });
      });
    });

    syncTrackButtons();
  }

  function bindPage() {
    updateYear();
    bindReveals();
    bindContactForm();
    collectPlaylistFromPage();
    updateNavCurrent(window.location.href);
  }

  async function softNavigate(href, options) {
    options = options || {};
    const url = new URL(href, window.location.href);
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const nextPath = url.pathname.replace(/\\/g, "/");
    if (!options.replace && currentPath === nextPath && url.hash === window.location.hash) {
      closeMobileNav();
      return;
    }

    closeMobileNav();
    document.body.classList.add("is-navigating");

    try {
      const response = await fetch(url.href, { headers: { Accept: "text/html" } });
      if (!response.ok) throw new Error("nav");
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const newMain = doc.querySelector("main");
      const newFooter = doc.querySelector(".site-footer");
      const currentMain = document.querySelector("main");
      const currentFooter = document.querySelector(".site-footer");

      if (!newMain || !currentMain) throw new Error("nav");

      currentMain.replaceWith(newMain);
      if (newFooter && currentFooter) currentFooter.replaceWith(newFooter);

      document.title = doc.title || document.title;
      const desc = doc.querySelector('meta[name="description"]');
      const currentDesc = document.querySelector('meta[name="description"]');
      if (desc && currentDesc) currentDesc.setAttribute("content", desc.getAttribute("content") || "");

      if (options.replace) history.replaceState({ soft: true }, "", url.href);
      else history.pushState({ soft: true }, "", url.href);

      window.scrollTo(0, 0);
      bindPage();
    } catch (e) {
      // Fallback only if soft nav fails — may cause a short audio gap
      window.location.href = url.href;
      return;
    } finally {
      document.body.classList.remove("is-navigating");
    }
  }

  document.addEventListener("click", function (event) {
    const anchor = event.target.closest("a");
    if (!anchor || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!isInternalNavLink(anchor)) return;
    event.preventDefault();
    softNavigate(anchor.href);
  });

  window.addEventListener("popstate", function () {
    softNavigate(window.location.href, { replace: true });
  });

  audio.volume = 0.8;
  audio.muted = false;
  volEl.value = "80";
  muteBtn.classList.remove("is-muted");

  bindPage();
  updateMeta();
})();
