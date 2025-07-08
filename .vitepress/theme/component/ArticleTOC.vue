

<script client>

function buildTOC() {
    const headings = document.querySelectorAll('#article > .body h2, h3, h4');
    const toc = new Array();
    let lastH2;
    let lastH3;

    headings.forEach(h => {
        const level = parseInt(h.tagName[1]);
        const item = {
            level: level,
            id: h.id,
            text: h.textContent,
            children: [],
        }

        if (level == 2) {
            toc.push(item);
            lastH2 = item;
            lastH3 = null;
        } else if (level == 3) {
            lastH2?.children.push(item);
            lastH3 = item;
        } else if (level == 4) {
            lastH3?.children.push(item);
        }
    })

    return toc;
}

function createTOCElements(elementId, toc) {
    const container = document.getElementById(elementId);
    const dataVid = container?.getAttributeNames().filter((name) => {
        return name.startsWith('data-v-');
    })[0] ?? '';

    for (let i = 0; i < toc.length; i++) {
        const l2Children = toc[i].children ?? [];
        const l2Ele = document.createElement("a");
        const number1 = (i + 1) + '. ';
        l2Ele.setAttribute(dataVid, '');
        l2Ele.classList.add("l2");
        l2Ele.textContent = number1 + toc[i].text;
        l2Ele.href = "#" + toc[i].id;
        container?.appendChild(l2Ele);

        for (let j = 0; j < l2Children.length; j++) {
            const l3Chidren = l2Children[j].children ?? [];
            const l3Ele = document.createElement("a");
            const number2 = (i + 1) + '.' + (j + 1) + '. ';
            l3Ele.setAttribute(dataVid, '');
            l3Ele.classList.add("l3");
            l3Ele.textContent = number2 + l2Children[j].text;
            l3Ele.href = "#" + l2Children[j].id;
            //l2Ele.appendChild(l3Ele);
            container?.appendChild(l3Ele);

            for (let k = 0; k < l3Chidren.length; k++) {
                const l4Ele = document.createElement("a");
                const number3 = (i + 1) + '.' + (j + 1) + '.' + (k + 1) + '. ';
                l4Ele.setAttribute(dataVid, '');
                l4Ele.classList.add("l4");
                l4Ele.textContent = number3 + l3Chidren[k].text;
                l4Ele.href = "#" + l3Chidren[k].id;
                //l3Ele.appendChild(l4Ele);
                container?.appendChild(l4Ele);
            }
        }
    }
}

(() => {
    if (document.getElementById('article-toc') == null) {
        return;
    }

    const toc = buildTOC();
    createTOCElements("article-toc", toc);
})();

</script>

<template>
    <div id="article-toc">

    </div>
</template>

<style>

#article-toc {
    position: sticky;
    top: calc(50px + 16px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 240px;
    height: 100%;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    padding: 16px 16px 16px 16px;

    border-radius: 8px;

    background-color: var(--secondary-bg-color);
    box-shadow: var(--float-component-shadow);
}

@media (max-width: 1156px) {
    #article-toc {
        display: none;
    }
}

#article-toc a {
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: var(--text-transition-attribute);
}

#article-toc a:hover {
    color: var(--secondary-text-color);
}

#article-toc .l2 {
    padding-left: 16px;
}

#article-toc .l3 {
    padding-left: 32px;
}

#article-toc .l4 {
    padding-left: 48px;
}

#article-toc::-webkit-scrollbar {
    background-color: var(--secondary-bg-color);
    transition: background-color 0.8s;
    width: 8px;
    height: 8px;
}

#article-toc::-webkit-scrollbar-thumb {
    background-color: var(--secondary-text-color);
    border-radius: 8px;
}

</style>
