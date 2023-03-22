import axios from 'axios'
import ClipboardJS from 'clipboard'
const app = () => {
  type kijipare = {
    ja: string
    zh: string
    id: string
  }
  const managePerfix = 'https://bozuman.cybozu.com/k/20708/show#record='
  const buttonStyle =
    'box-sizing: border-box;margin-left:12px;font-family: inherit;display: inline-block;padding: 6px 12px;line-height: 1.128571429;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid transparent;border-radius: 4px;user-select: none;color: #fff;background-color: #f0ad4e;border-color: #eea236;font-size:11px'

  async function getKijiDz(): Promise<kijipare[] | null> {
    try {
      const r = await axios.get('https://dld-dev.oss-cn-shanghai.aliyuncs.com/ass/kiji.json')
      if (r && r.status === 200 && Array.isArray(r.data)) {
        return r.data as Array<kijipare>
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  function addButton(pareTable: kijipare[]) {
    if (!pareTable) {
      return
    }
    const regexja = /articles\/(\d+)/
    const regexzh = /article\/(\d+)/
    for (let i = 0; i < pareTable.length; i++) {
      const matchedResultJa = `${pareTable[i].ja}/`.match(regexja)
      const matchedResultZh = `${pareTable[i].zh}/`.match(regexzh)
      if (matchedResultZh && window.location.pathname.includes(matchedResultZh[1])) {
        const eles = document.getElementsByTagName('h2')
        if (eles.length > 0) {
          if (pareTable[i].ja) {
            const findPareButton = document.createElement('a')
            findPareButton.setAttribute('href', pareTable[i].ja)
            findPareButton.setAttribute('target', '_blank')
            findPareButton.setAttribute('style', buttonStyle)
            findPareButton.innerText = '日语原版'
            eles[0].lastChild && eles[0].insertBefore(findPareButton, eles[0].lastChild.nextSibling)
          }

          const manageButton = document.createElement('a')
          manageButton.setAttribute('href', `${managePerfix}${pareTable[i].id}`)
          manageButton.setAttribute('target', '_blank')
          manageButton.setAttribute('style', buttonStyle)
          manageButton.innerText = '管理'
          eles[0].lastChild && eles[0].insertBefore(manageButton, eles[0].lastChild.nextSibling)

          const copyButton = document.createElement('a')
          copyButton.setAttribute('data-clipboard-target', '.original-content')
          copyButton.setAttribute('style', buttonStyle)
          copyButton.setAttribute('class', 'doccopy')
          copyButton.innerText = '拷贝文档'
          eles[0].lastChild && eles[0].insertBefore(copyButton, eles[0].lastChild.nextSibling)
        }
        break
      }
      if (matchedResultJa && window.location.pathname.includes(matchedResultJa[1]) && pareTable[i].zh) {
        console.log(pareTable[i].zh)
        const eles = document.getElementsByTagName('h1')
        if (eles.length > 0) {
          const findPareButton = document.createElement('a')
          findPareButton.setAttribute('href', pareTable[i].zh)
          findPareButton.setAttribute('target', '_blank')
          findPareButton.setAttribute('style', buttonStyle)
          findPareButton.innerText = '中文版'
          eles[0].lastChild && eles[0].insertBefore(findPareButton, eles[0].lastChild.nextSibling)
        }
        break
      }
    }
  }

  function testDrarftAndJump() {
    axios.get(location.href + '?from=draft').then(function (response) {
      if (response.status === 200) {
        location.replace(location.href + '?from=draft')
      }
    })
  }
  function draft404Countermeasure() {
    for (let i = 0; i < document.body.classList.length; i++) {
      if (document.body.classList[i] === 'error404') {
        testDrarftAndJump()
      }
    }
    const unlogin404 = document.querySelectorAll('[data-letters="404"]')
    if (unlogin404.length > 0) {
      testDrarftAndJump()
    }
  }

  const gogogo = async () => {
    new ClipboardJS('.doccopy')
    draft404Countermeasure()
    const getArticlePareResult = await getKijiDz()
    getArticlePareResult && addButton(getArticlePareResult)
  }

  gogogo()
}

export default app
