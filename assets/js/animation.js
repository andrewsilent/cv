function init() {
  function splitString(options) {
    const defaultOptions = { delimiter: "letter", tag: "span", addClassName: "animate", selectors: [".title"]}
    const o = {...defaultOptions, ...options}

    const divider = () => {
      if (o.delimiter === "letter") {
        return ''
      } else if (o.delimiter === "word") {
        return ' '
      }
    }

    o.selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(node => {
        const arrayOfChildren = node.childNodes[0].data.split(divider()).map(value => {
          const tag = document.createElement('span')
          if (value !== " ") {
            tag.className = o.addClassName
          }
          tag.innerHTML = value
          return tag
        });
        node.removeChild(node.childNodes[0])
        arrayOfChildren.forEach(child => {
          if (o.delimiter === "letter") {
            node.appendChild(child)
          } else if (o.delimiter === "word") {
            node.appendChild(child)
            const whitespace = document.createElement('span')
            whitespace.textContent = " "
            node.appendChild(whitespace)
          }
          node.appendChild(child)
        })
      })
    })
  }

  function animationOnMouseOver(options) {
    const defaultOptions = { animation: "rubberBand", selectors: [".animate"]}
    const o = {...defaultOptions, ...options}

    o.selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(e => {
        e.addEventListener("mouseover", (e) => switchClassName(e.target, o.animation));
      })
    })
  }

  function switchClassName(element, classname) {
    if (!element.classList.contains(classname)) {
      element.classList.add(classname);
      setTimeout(() => element.classList.remove(classname),1000)
    }
  }

  function switchClassOnMouseOver(options) {
    const defaultOptions = { selectors: [".section-skills .list .item"]}
    const o = {...defaultOptions, ...options}

    o.selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener("mouseenter", (e) => switchCustomClassName(e.target, ""));
      })
    })
  }

  function switchCustomClassName(element) {
    if (element.classList.length > 2) {
      const classname = element.classList[2]
      element.classList.remove(classname)
      setTimeout(() => element.classList.add(classname), 100)
    }
  }

  splitString({delimiter: "letter", addClassName: "animationRubber", selectors: [".title, .second-title, .section-title"]})

  animationOnMouseOver({animation: "rubberBand", selectors: [".animationRubber, .contacts .link"]})
  switchClassOnMouseOver({selectors: [".section-skills .list .item"]})
}

document.onload = init();
