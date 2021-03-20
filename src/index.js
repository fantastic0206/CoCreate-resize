function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + " .resizer");
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener("mousedown", resizeByMouse);
    currentResizer.addEventListener("touchstart", resizeByTouch);

    function resizeByMouse(e) {
      console.log(e);
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      original_height = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener("mousemove", resizeMouse);
      window.addEventListener("mouseup", stopResizeMouse);
    }

    function resizeByTouch(e) {
      console.log(e);
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      original_height = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_touch_x = e.touches[0].clientX;
      original_touch_y = e.touches[0].clientY;
      window.addEventListener("touchmove", resizeTouch);
      window.addEventListener("touchend", stopResizeTouch);
    }
    // currentResizer.addEventListener("mousedown", function (e) {
    //   console.log("mousedown");
    //   e.preventDefault();
    //   original_width = parseFloat(
    //     getComputedStyle(element, null)
    //       .getPropertyValue("width")
    //       .replace("px", "")
    //   );
    //   original_height = parseFloat(
    //     getComputedStyle(element, null)
    //       .getPropertyValue("height")
    //       .replace("px", "")
    //   );
    //   original_x = element.getBoundingClientRect().left;
    //   original_y = element.getBoundingClientRect().top;
    //   original_mouse_x = e.pageX;
    //   original_mouse_y = e.pageY;
    //   window.addEventListener("mousemove", resize);
    //   window.addEventListener("mouseup", stopResize);
    // });

    function resizeMouse(e) {
      if (currentResizer.classList.contains("bottom-right")) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
      } else if (currentResizer.classList.contains("bottom-left")) {
        const height = original_height + (e.pageY - original_mouse_y);
        const width = original_width - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
        }
      } else if (currentResizer.classList.contains("top-right")) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
        }
      } else {
        const width = original_width - (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
        }
      }
    }

    function stopResizeMouse() {
      window.removeEventListener("mousemove", resizeMouse);
    }

    function resizeTouch(e) {
      if (currentResizer.classList.contains("bottom-right")) {
        const width = original_width + (e.touches[0].clientX - original_touch_x);
        const height = original_height + (e.touches[0].clientY - original_touch_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
      } else if (currentResizer.classList.contains("bottom-left")) {
        const height = original_height + (e.touches[0].clientY - original_touch_y);
        const width = original_width - (e.touches[0].clientX - original_touch_x);
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.touches[0].clientX - original_touch_x) + "px";
        }
      } else if (currentResizer.classList.contains("top-right")) {
        const width = original_width + (e.touches[0].clientX - original_touch_x);
        const height = original_height - (e.touches[0].clientY - original_touch_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.touches[0].clientY - original_touch_y) + "px";
        }
      } else {
        const width = original_width - (e.touches[0].clientX - original_touch_x);
        const height = original_height - (e.touches[0].clientY - original_touch_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.touches[0].clientX - original_touch_x) + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.touches[0].clientY - original_touch_y) + "px";
        }
      }
    }

    function stopResizeTouch() {
      window.removeEventListener("touchmove", resizeTouch);
    }
  }
}

makeResizableDiv(".resizable");
