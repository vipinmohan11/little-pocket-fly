#!/usr/bin/env python3
"""Assemble the single-file app: python3 build.py  ->  index.html (+ sw.js cache list from version.json)"""
import json,re,pathlib
R=pathlib.Path(__file__).parent;S=R/'src'
ver=json.load(open(R/'version.json'))['version']
pack=(S/'pack.json').read_text()
js=''.join((S/f).read_text()+'\n' for f in ['content.js','city.js'])
js='var PACK='+pack+';\n'+js+''.join((S/f).read_text()+'\n' for f in ['core.js','pages1.js','pages2.js','pages3.js'])
js=re.sub(r"var APP_VERSION='[^']*'","var APP_VERSION='%s'"%ver,js)
css=(S/'style.css').read_text()
html='''<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Kofferforscher</title><meta name="theme-color" content="#13324A"><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/icon-192.png">
<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">
<style>'''+css+'''</style></head><body><div id="app"></div><script>'''+js+'''</script></body></html>'''
(R/'index.html').write_text(html)
sw=(R/'sw.js').read_text()
sw=re.sub(r"const VERSION='[^']*'","const VERSION='%s'"%ver,sw)
(R/'sw.js').write_text(sw)
print('built',len(html)//1024,'KB, version',ver)
