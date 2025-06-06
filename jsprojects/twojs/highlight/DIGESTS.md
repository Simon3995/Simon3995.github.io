## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"
  integrity="sha384-E686LPKY91pDpfYgfZ8rKJcDcl5N3Q8PK1FUnDwJTqLejBG6X8Kiz9pYefk4ccRb"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/go.min.js"
  integrity="sha384-bntN2rErIEfh7iN9HOTOQU4yU6F4rCa7NM4NPjbZPa+XT3DXR2OCSGiap/rCSPWf"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-E686LPKY91pDpfYgfZ8rKJcDcl5N3Q8PK1FUnDwJTqLejBG6X8Kiz9pYefk4ccRb highlight.min.js
sha384-IdAwNubTWfurzULDc9X/Eh/tnDZhgDE1KfCwy7F1YQ1p3lSrLLq9Ip+OCTHwlCCW highlight.js
sha384-EbCfnKHp+pNOHahfydVrmxA/GZEFXmRBykTNDMQXiEjSDipEF0oDMFKbWxiWi/HG es/highlight.min.js
sha384-zE5c+w8tBBuqZGwolZi3sLXzw6uKikysuUv3Y32E7u10W192uctdoOxDuvSvbp4y es/highlight.js
sha384-EbCfnKHp+pNOHahfydVrmxA/GZEFXmRBykTNDMQXiEjSDipEF0oDMFKbWxiWi/HG es/core.min.js
sha384-zE5c+w8tBBuqZGwolZi3sLXzw6uKikysuUv3Y32E7u10W192uctdoOxDuvSvbp4y es/core.js
sha384-0eEGnL4+uQE7BkIA3x6cgZdBVsMqIjUMSSThD+h4mqH+3jDtnzrvqUZAfFOLKN6a languages/1c.min.js
sha384-kBgyjyu+mUq2h3Vs+Gr8ZvGZszGWLFNVi5zGmAB4fjVM7ZqgG3RgoonhMlgBFm6K languages/accesslog.min.js
sha384-U8+zts9u5N7DHB67n+fhery3GbBY3sqBu+rHokEcX2ilMdhLe8yflYZ/AaNdMewT languages/abnf.min.js
sha384-9d5mbpwynEl5zBFdHcLR90cVO6I353MovWStUi9/EIeGqw/HmLDYbzUHBXtvxrDX languages/actionscript.min.js
sha384-036wrl2uK1mXvJ/9+kBFdyAyJ9T+tCUY995EOxaaXGprnb53CMpgZMMvZVYVHjzq languages/ada.min.js
sha384-cDwrLVl0Fw3iTwZZHrCeANBo0BBwp1aS4dRMR+sTEemcTft7qa33sIq7o68yaYhB languages/apache.min.js
sha384-+bNqmFjQuvq934R6LyX6vTH3/QF5ZL8Uu6uDCjWy2J1OPSJNep/9LG5zo/lDik/B languages/angelscript.min.js
sha384-gAzVkzzmCJZajKHJogrPpP5AK6FTfJSHA5C1m26gtGiZ/pi3hmRwbAALNieISLZ3 languages/applescript.min.js
sha384-eVmQ9K+iHvbXeW/yqRpYCKRcFm6vKpBQXH6Q7THINy+7hfB/IdF0RabfF7lui8y/ languages/arcade.min.js
sha384-v/TUA5TmTPUc/SwxhkGOeC0JUb3YQHKMKxehieSnCRqpgCt0CODBJgh9VxRu6CGV languages/armasm.min.js
sha384-JoeSw2IaFUYToAQD9Desu3azpcoaeA6/oHfPlnpG+mAPv34cHMNmcfeBDRWPLgmn languages/aspectj.min.js
sha384-ELLGKVNiHkp7DKzlU4H41mSW+oB5ODAtEOpd6UlVpZWgPgYY3CHLD/u73Ke35YZm languages/asciidoc.min.js
sha384-kn8RtjRw/0IaPxq2frmJZ1Qcd0vV7r8vrJxbGSEfObJDusSYc22ZNRJCCnsSt4fX languages/autohotkey.min.js
sha384-47a7bV/OWTxxwoQriEsOk5B9ubQb//oHmXxi33bsMxzCOO8dRvDv6coRmia9WZrQ languages/autoit.min.js
sha384-WcAFFBwyc7VvzzaByb6tyu+PP8EShd4P+UudwE4faYQapayqGWYT2d6f3xGr9WWE languages/avrasm.min.js
sha384-W+k5GQWAes0qB3UfRhKT5mZGzdL6lk+h2ZHCWfnTWwe6VaviTGKCZXvTDah81uOC languages/awk.min.js
sha384-y2x6zqdIrszmVy/vnWcWO9keHAxVJXYBMo1ElwcXtUBVPfmKG8NOpcaWqczWyJ1H languages/axapta.min.js
sha384-UUUYY/V15cKF/MxnKj8rjiJcxyjUzHFKZbQ1JjttHQoa9zXP7hWj26Eo3AT+Sk/r languages/bash.min.js
sha384-W+Ye2WHsGBeBeqbdqLK9NqRCmU3aNvjsw8shZCOOKz/v38V3e6hWpIcWzQ+yLZ0f languages/basic.min.js
sha384-of6B8mh9T57i1vNeKNrQJHFbioCnrm6W5f3XHuou9xqZiWT+GWKz8h+ZqjuHgsTq languages/bnf.min.js
sha384-S98xILvDH6OaTt4PkpgDAcnWl9wGLPN7ME4nIofSNqyPxzj9RV1io0+I3Fifs8kR languages/brainfuck.min.js
sha384-weZU7LB2JHpSJrIlaw/hQMnKH+MGpyF+jEUp0iZvdf1aE0Lzjc8EE2uEilMEmA3q languages/c.min.js
sha384-epouc4TstMq8G5dY4JAbQqIgIHDKbM5yliiTZUokCdUN36mrtTciql8m1O1zdXu6 languages/cal.min.js
sha384-990Nh7M1wKrl4uJR236njQsafVS5w8D1cjXqdhne/hUDhYmcer1DOnE6RaFH4V3y languages/capnproto.min.js
sha384-90cSAu6tSzfsW8vE0oMq3AQbVt7Oiba1hb8Ak5WMrlE/DiNi6caRj77sA/G10qAE languages/clean.min.js
sha384-jqudAvuar6JDgbkHdnZQg4/4tytmCDcBBl+XE/wCKl19d116M862IqEAoTy7g4XY languages/ceylon.min.js
sha384-tkSXGnySZzodiGS0HyfTtq2OauA3+UGxS99SfHk/M3JIeSHEVZo926uk4obmxkzy languages/clojure-repl.min.js
sha384-/l3V61y9wPYjJLIdIhYipO3NLhxEnXu4gd79VRSRtNF6Lp647wBiDi+u7ruCkK/N languages/clojure.min.js
sha384-l4pvNvXhY5tIG7p1R9FWHd563wp4eaHWZItmuHGDrAks8U8vc5jQAbwHEM95gh1z languages/cmake.min.js
sha384-69/W1VrbBgygyWlihyZ1PnKjWMMbhVuDoMY8yaihVW3UjEVBM8Sx9WqVMypMM+9z languages/coq.min.js
sha384-yYECMXwyLLjJAr6aVoWUIKX+VMQSDLshm+damRX+xEC9MaKDh0QnF7pB50iI/pST languages/crmsh.min.js
sha384-cIUQYhkl4hO8eB4WqAq0awFMecAgSVdAqd7IvJgny4uaGzdKPRwhKto6tJD/bDEM languages/cpp.min.js
sha384-lbLuWRkbQDlR2s0abWn0tCBHj8CuhG1UPOzVIbMzaWz7GIf1wng4GmWpTk89Q94F languages/cos.min.js
sha384-gmgZrJVlvYGOj5O6LIZR6bd3XS3MicVDcBYqtvu3kXsOB/BhK6QHVGSt5pXVQzDV languages/crystal.min.js
sha384-YouD5VqXZZBAZhI7cI5B2NqBH+QZX6wf/2dGFNbOXJSfndSdEshZ6ydnHq6X0eiI languages/csharp.min.js
sha384-VU8mS0+8c2/zgXkhUuKpPN6584oT+cT7ap0kOr2y6y83GuEA7eINYLDAK/GMS+P/ languages/csp.min.js
sha384-SjTVEAJrlUJUY3jqDbbVzB97LwvzOXimXwarFPtmt6ze0x4TSBwAC4F/37+1D3qM languages/d.min.js
sha384-px4Smy7MgY+MVfyazu/x5RbPsZpTZoTksQ8KEhUlcLQahKbCJ8oT0zj92nGjZLXz languages/dart.min.js
sha384-llKWyxrH5WXhjH5/Y1vQJSjsCW5r2/AjQuTyHpGCKwseYriTY0sWRmJlwLibDs3n languages/diff.min.js
sha384-cC9qRSBqZlWXCTZ0dFk3RsvzTgZHK2H94AQ84rSptmFs7Jhd5DFh0NFVMVa1jPQz languages/delphi.min.js
sha384-NXdeMHhPmTgfptEZEePgs4p8gjM4TiGDgCiEHLgiGMLYGpH8PcaXxQQfSJggoTEF languages/django.min.js
sha384-v1t/kqrWQbhue3qJ5dzO+2oKcDPZyogea6F8ke+rzsrQSZ5R3ykY2X+Ho+nCJkZR languages/dockerfile.min.js
sha384-zRMDggwzTBL30k1jb/PN0UThu3SBkwiQiZTj1qo+rxBwvyAPvhMea7zKJWdnM8fH languages/dns.min.js
sha384-JY31GxjQE7g1jfGmbfarzAnFzP+yfwNmSM0b9tY2/GZn9+o8AZklpP0oKf24Aq2k languages/dos.min.js
sha384-bKz0JC29yy52PQ9UucxACdUsW+a8t+tQBQ60veQeke0dTrDhip7Ky/ZfXVgtP4HU languages/dsconfig.min.js
sha384-M1wh0O4AcCzNYCdvwlazxlolxHT245HLsfgRWbmer3wV8ifpQzPoI5CH/BbE4Pmm languages/dts.min.js
sha384-6KghA1uG7ykSqJlWHDXm3EOAE2Zi0SxkENrtLJwgt5Px4UqUf+/cB5MBre6GGyu9 languages/ebnf.min.js
sha384-GSHveRTSTHqYLkEk9EnzWJkRj+y6hifMfNsMuqyjQZDFZKryfTIOV6wIcPIFsocD languages/elixir.min.js
sha384-IuwWOEoIjwYMJXhB9zeYdKV1ca2U4AVNz+dyFXp+OVdS6hDHrarGI7zfXwuyqsiZ languages/dust.min.js
sha384-mIV8VdeB9ecWWqREB5QhpOVplpqkrZr4RXzvJJ9BGvYgRX3FqPHxU+pgUAtmRu79 languages/erb.min.js
sha384-a1As86vp5LiBPq7PnPPQrNPQzVhe2poKSgOI6oRoxQT36z/ZBxFQdYlfJfSvAV5v languages/erlang-repl.min.js
sha384-EjRzkY+uA56V0HMFNH78kFQ9gzxJ71ls8xSSx1kxtTkHe86drzI+G938aQ1PCQyZ languages/erlang.min.js
sha384-C/RtFiNYW347MHlU5SUJtmkYz2VNSWIW7/FxHxR3Wg9p3ZIzWfziSuWYCgNUbyi/ languages/excel.min.js
sha384-0eNv2j6OFVu37mM7L7iqdYmcKlauXZZhvWpOo6FKwjFg9Bic8LE9pPVKL3baJVyR languages/fix.min.js
sha384-dIiGGNq2sOiP8+HtdIHoS/GAwgyzLNCL7GcfXDT0kh8LDebAYAjeDphxhp/54/L7 languages/elm.min.js
sha384-xu1+XfbM0Fx+6x6AGDly8a7Sr51uqJiQY7fqZJFfKJOogVqPnxpQNku9/lAjDprZ languages/flix.min.js
sha384-qgNYfjNrohpHVkcRqsP+Pjt8aEagmeSonZl7LdIRn1/iYB15HIMvJL7TRt0gSAmq languages/fortran.min.js
sha384-wLuNWfXXs+Z55WG+2h1ovrQEu+OiC0P0NomfWsb4+tyrM6gtVrACIFrqw9Lt0NTO languages/gams.min.js
sha384-YxoQTgnuYDiH6uYyi4C1YF9y9v5feWEdqry20B6vYpo8qjDDPtYKB8N4oV1X/qTa languages/gauss.min.js
sha384-XbNYwjLeIZgk6e0WcqK5D43coBm4kq10VCIujhoIgMRGRYD8/ACtchQ6N0CEqJ1g languages/gcode.min.js
sha384-AwpXwB3ZNJZDjU6NY2LdeBT3w6miLGYOL382npM1/qtPUMYWKIly2yxHqYaEcZut languages/glsl.min.js
sha384-bntN2rErIEfh7iN9HOTOQU4yU6F4rCa7NM4NPjbZPa+XT3DXR2OCSGiap/rCSPWf languages/go.min.js
sha384-rKHcr6E5sHD8zRi5R0lXi92UMMTJRDheIpmiIMltLZFdWyWtf9zFWbE1xpyDzQWk languages/gherkin.min.js
sha384-h6oHmP8z6uzbzk27jPbkt7cJjbGt70ejlq09ATCYXQIyypb3StK5dm2n5rKPCkdR languages/golo.min.js
sha384-BbbtUWl/aW6lRj9mDkcBK+UseZQTwTIFilC0mJKpITHaCQm6FgLNLxzUkg/ePPKy languages/gml.min.js
sha384-sbWsEL20CUMC471j049FzZWruqvwhMieWbgf7R7AWVhpy0lZWCCtSK7Heke2yzKg languages/gradle.min.js
sha384-dmLPUgNNhwcfgxUWCh2nCohHIG9Tq/rBBGaoz+Io7TkGR9kgkrffKVxcSm46mhOs languages/graphql.min.js
sha384-IILQrR2JYKDZyIGK4GywQdwSNvqKJ8hLLmo1dV9Mf54cfLQ4eQnqrW1Qf62+qY7P languages/haml.min.js
sha384-T8EyWO/sfU4+me4llBAxskQfZp/w7uhsXJBUV0ccLqfZQC6xhODMN/yarfhB4JCi languages/groovy.min.js
sha384-MaTAvtMGxIgu6G68PeIBn2L5ocD0kSEfDFrxZgiCmq0gjdTydF045PAAO2ifvBFM languages/haskell.min.js
sha384-I4sWR4QweCsPcdswEtIFqSetHBAUAFvGtf6HXLFXD9WFM9JRs/5DDIkjBARYGZcj languages/handlebars.min.js
sha384-TLullB4oN9Mh5sW9CTP0om0d313vEFpwLLTY1DZ8WjY6OkBttKtu6G00GQzqJ6ji languages/haxe.min.js
sha384-dS01oN/Afxe5m6D/HqKqnJrLlrYQpKLsb4jbWMvKKfZ5IhKcnjbP3nMXvW+2eSwH languages/hsp.min.js
sha384-Y0oUOyozLTMpfqKTxRO7biEWzfuYVBy+akzw0alVmzgsZi+d/Lu6EhrMgBeTtzDL languages/http.min.js
sha384-eqnKpuZEbjgHNEDSI+kZpLCZ79uuKbcYPHpLhY8BmHEphvprMaHTomRlYENiUaV7 languages/hy.min.js
sha384-omzHBsieDNp/vyNBQxQ5HorgKa2nap1xI+jn5Z1JT01YxRHGlR2S30FX6ZfJPKIP languages/inform7.min.js
sha384-US8LgnTXVfzBs+Ceyn4IILAHk7hAdu9ScwPbRfZj14OedDnMEQS34hp7B/e9vL3m languages/irpf90.min.js
sha384-Y4IyCyqLKtoa/+AjmGxxIwdgrgndTvRE5y56exN+vyrxmWQh1CodZAnX6fHCfUZ1 languages/ini.min.js
sha384-cw31bMxws8uHgGY1U37ltQV7mwSo1qYG+LJRimdbuOeTfs/4vwfIgyZYrFJ2Pblf languages/isbl.min.js
sha384-e+rQ73aRx4IBdjWPoEI9GgkBrxvyj2W6eoaqs2DbDrZKD7P9LUCnGHXqGV1STEvT languages/jboss-cli.min.js
sha384-H1NGK0vlxZxEgoNoQLEc3If3KzPzzjsQtJUqk+PXyJzroAXFb1XOE+cTpJUShk3S languages/json.min.js
sha384-+bvUChrd44N6bu/kjHH95qcm5mZLZ5nBsvQgqTzM9fowILvV3qZISsVNhS08wY0u languages/julia-repl.min.js
sha384-zGnS+rSKjbyNGzXngLn2xa1vryV+eBp+ENRTlKixQTArL7LlJYPK4+Z8dNEbfYJR languages/julia.min.js
sha384-J6iyttVVlZ7fJvcSGWyHTxNu2TEl1v8fMxfq6+XPld/pSwL3QPBRA8cnLkahxSa/ languages/lasso.min.js
sha384-QM7p25mWs4KTOmYaTn/Dzhbbvlw1NOPmdE4V7JmR6by3fkyIT/Yii44rYvOeA8kk languages/latex.min.js
sha384-G3HldUN49JthTPVlGwDCRbihix6oRqRPGZwi49oalT7BnRG0GsJebkY2C2vO9Fli languages/ldif.min.js
sha384-GSdFrk9kTn3CUWJcnIvFafTr5JG+fOiGHljmfgwrg2NQLdcng3B7O0AIHCqWGih3 languages/leaf.min.js
sha384-fNwvp4pAaEZyu2aowwBqtujInltv5/jZNXAt+8yi+zdzxQbqtWgyjpCsW11GLw7A languages/lisp.min.js
sha384-2tLSa08MOtszOIbLojaO22vvw8CBkk/fkPMmYt58VMVRUN1ilV09tstK91JcHZ4P languages/livecodeserver.min.js
sha384-s0OF4w7R2WG0JHjof/ivxlumz6aBVAq/rEbJw5Kqz4xtEY03B5BCOdgqqRb37XpK languages/llvm.min.js
sha384-iUo/W/yvjq7XoaAhURIs+8foZFFOTmjb7Ppr+Rhf4BcRDgdj2M7DCALV4sBVNIuc languages/lsl.min.js
sha384-WwR0/ZpSQnSbICCC8QKVTVBq7umlOn6Cd4wYFkghio9noaPIdTA5BmisO7Dl+o0N languages/lua.min.js
sha384-FtlHOlXmTfHiRaLK48mFPElzKQJ6Lem+CXk8Ze5CJHxletCIp/ShVh26deCl+Cqq languages/makefile.min.js
sha384-JSW6hrEbxGIyyQdYOa92MUJmThMgttNWEhcM00c6UCticTpCcJG3vNU3RTiFExgx languages/markdown.min.js
sha384-KiAAudMWsxVNi1b8a4dynPRCBbgOJ0nvVX3rbwQi6Z/OEtO3OY6P+TntvVWoeeUu languages/matlab.min.js
sha384-eTcGNGUoe+A5hWt/oPfvOBfGJz+mBwyhofupLj+byV5mukxRStJesS/hvA/1WuYF languages/maxima.min.js
sha384-nculbPCABaRNZMLnirpQDm5d/BiUWE59BOKG+a5SewPUOFP/nw5IRGqPOqS77s1n languages/mel.min.js
sha384-iKnPAPimK0dVH6hHAj4rJHK9G3MwvLC9P7RmQc78irTON8STbzg5TsQLc8cE7aSP languages/mercury.min.js
sha384-N7/OFYkpFOC/qg0e6UGvmviCQ1RNmQBIxkvt+bmbvTyBTxbPg+Qk5j7mXbNxFYgK languages/mipsasm.min.js
sha384-cJWglYVHf0tCSITTE8lnGDU936lpz1PesrgI/el2Wdu7OmaSda7L5jouGGmgXCYg languages/mizar.min.js
sha384-MgfqyXpg6dgm2vKMjIQCMqoCheerWnJk6z+BAvI+dfsqpEyGEJPkdpWSmqn6KXuG languages/mojolicious.min.js
sha384-P4CcloTi/dS5xxncrUmCRH7zzgwmjdrh39wPFZLpZXY3mmhbFpqxDEtb+InN+ERL languages/monkey.min.js
sha384-uXyR+ao/3vxCI2DEyFBfS9jaYN3phGjK8lZp8m6hUQM6TssyPgLDT2wKiYjwsXz0 languages/moonscript.min.js
sha384-pd1HAh2FWa/L1SBQd0GoX8r5sIQtn6TWCN0cbBCVA/67B6jMdNSROKu2zWQhDki2 languages/n1ql.min.js
sha384-IzBvM0p5CvAZbCk72f1pfi4f2LllXYXlHad9I2/nrd6fayq9raKBcr9a87N2+6ZC languages/nestedtext.min.js
sha384-CDgWpRWpvT3SSy+P53I6P8DTyzb6mkjFI4p5qWNRX0hzrOEztHWllCOVwTzNJAQ7 languages/nginx.min.js
sha384-bLjFoaEyWwGPjZYXxByNtJk15R6xdoDzK0iOqQCTt+/Fn+375z6UcU/Ndg5OU9mc languages/nix.min.js
sha384-qxN/SQAWPrC9V86aTpXuOY8HztRZqcL088OjGWfJ+DNPpTkEg7gplaeH1Xt9NIbP languages/nim.min.js
sha384-0IXFbCkaSgfPcm/zbP8qYCwBI/9A7Uar3/HV4w7/EOz+ayaKDgYG0d4a3WebaS5o languages/node-repl.min.js
sha384-6QyglpC8AIB28TAZFhn8PTDTRmk+iBvmtr9wXr8KJibEw2uviNS0yPCF1gNSeWfv languages/objectivec.min.js
sha384-F+u48FiYmlIRMadrxdfvbHE1Yeu/bMhLHJ6SH50l6zQHQ0gUTTdqdVd3jbolAbxV languages/ocaml.min.js
sha384-8re17wvmeI6o5bTAoruK8blai/w9yT25eeNYcBwJk8GUbwM/3/oOSD2xu1QCWWCs languages/openscad.min.js
sha384-QRSXCx0DJqTdQGDlMuVgvj8hWwjHGP8qg7TjCuZejRkhtu/+vYvFhq0uOtt9ltkq languages/oxygene.min.js
sha384-64/q/FpMKHTmOC+ayD/wwGbrS3n+gKpQ/Arf2X1FBLD6VJkQ71fgcF5VdyqFfs+S languages/parser3.min.js
sha384-YAjNkQ2SvSfzTXpL5w7JldHNWXiptrdRwvwwzLXUqYGh/Ok+Pxqgqg2Hbpvx0BNT languages/perl.min.js
sha384-IJa4yLBoy5+QLZEH6EejEpr3667h52h73eqgfaWJGrnnyMfZS9Y2xBE3K7IvqFxS languages/pf.min.js
sha384-/zy/qf8p1bzMRPi+Da2244smOTSHceCj8IzLhZinoLZJykUgZ4GxkjE/Jds51cJf languages/php-template.min.js
sha384-jFtNfX7hsYiDWPFZIdhWeRUBW2XZnyYXu6UFq3nzkOwM6teLmFn/Rw4aKVn6T2Q8 languages/pgsql.min.js
sha384-fz1CO81roc24yhiWTkkpuKOJ0jkdX47bbsRRfCYUOGITCSofjPGhz6Cxdvn6+rj3 languages/php.min.js
sha384-D+7hkE/iYabmUk02AoLLXMBot7b6NcsqDkbJadzc5j1hihiCJhgSxPNtJ2PIVXYa languages/plaintext.min.js
sha384-fwrZbeZjrtHAh9VyWeBidyZRVTZQDkcc9H4l3lWlkxX1vpY1b83LnCFI521nHe0P languages/pony.min.js
sha384-cnVhhFErB5Yk9Cp1qVLcGHc151NO8ZFqCFajb5/UBtEd+wPRgrOsPpaa/BmXxtUf languages/powershell.min.js
sha384-Pec1KTVAQLtXNa7FpzranM3El/IArFwiXz68eA4VRFEVf8sJmdcwKvJwWIy9n+Re languages/processing.min.js
sha384-VQGUwL82gpaqs6CH4d7nHONiXT+fNXFOHVlZz2bPS7vuBne8K9T4Mxka947kewyw languages/profile.min.js
sha384-7Y0bidLcSFPPzLwRdOR786TVje3VNTbUCbMEeJH6BInQIq8kHM4dk4cOAMUVojVf languages/prolog.min.js
sha384-JEvjMvBLlEUll/FS5AsrEHgPxnGd54G2TIiAs6K7RNn8BgzlAuFSjwbHGSD69vlu languages/properties.min.js
sha384-HAEqhV9TEy1ezeXjrLIW45+MU6FRXu0zOGRG4lJbUYy76qkRBFDU8qvrduad34nu languages/puppet.min.js
sha384-FsOcGUbXnl18OyXQwX3ZS6LyRtLaFYYBvAHOf7/Q/7v/SqJm3YVZ8cPak4bWCn9E languages/python-repl.min.js
sha384-YHXOinpjXfKQ0JJ4kkmEOAQV1aju//rDXcHrWBgPgZ0xeWNXA8SD+07CaSqZ+ryg languages/protobuf.min.js
sha384-xkLhLgYWiNowtXKSc9RSem/9l4tcD4mZg2g+HPCFa9iUDJ5nKJLy9Y2n8veOHEO+ languages/purebasic.min.js
sha384-0EkvOvPJDe7t47eSkiz1pp/B1WWuqLqcrGPJKePN+rZ3d50pFtcIqsBUgCMLUoMu languages/python.min.js
sha384-CMxof/yudXFxCsAMcLXBqg2N87mapl+emY94J8lf4qmgflBACgNj6XMTCAVidsLH languages/q.min.js
sha384-6ZGYA4cN7tF3QdOAn3BfO17kcOjC8OC/M30Mqs/e9y4dErn/6xd9FLxxIxhuOU4V languages/qml.min.js
sha384-wG1z1AwPgOAJA3DUuHZ1NqhXARXARUlCEnbsEgTN+KnlFL2/8S/GQazpg1WkE0RQ languages/r.min.js
sha384-sAPRl1phlHeUmCOfQGn0WzOzalgeiHOwuiMxFAhaoFJUp+142wubYTxnC/VdzmqW languages/reasonml.min.js
sha384-W2GPh4ogUD+9SksqQHwhNPqnS/KhzjEZYnLOckgL/gFmBR1wcIHMuf6wRp64hwh0 languages/rib.min.js
sha384-IaIVXdEVMYqJQ5jtPgYc7DAz+HGqjklaK8eOqCFwXH2A5lJRkiat+B7qVMSsNxMY languages/roboconf.min.js
sha384-m0peP/cjFteduE502pxJDRagLEJYgSou2oWqwzZkglUJHGOIc5EGwDbxIUyTKzGZ languages/routeros.min.js
sha384-yvMtIedxpZtiT2CTSi66pn/sMyuZAuaaMl17ZhAxlBPBi3BUfFxeGm1yi3DanKyZ languages/rsl.min.js
sha384-Kkj/Y0BxtorzhbKWWXmz6Y6Uvy8lHZbtQ7y5rsv2s7PNXUiXwYliGtww9c2BLkG1 languages/ruby.min.js
sha384-dhAptEp9AjveGt025T+uuNF9OicKd0TD4FMm22UBvpnE1/Bx67it5Q8BZGcExgwq languages/ruleslanguage.min.js
sha384-QQ4ARayCN1N/8rQfTBHj5QxximTvixlY/Wqk/T4NJ1NoaA+RtgmQyUUububG6V5N languages/rust.min.js
sha384-YRZKccMrqrGnvzIUcn0YGLTSX4L690ifm4K9MxGEP+HJtNkHMtnRe82Wa9XbOsik languages/sas.min.js
sha384-3kfmhFgUnYPbcc2fv0MeaBjU/FKSsJRimyHRiAoyraTnDsRPGwn4yHuxYrG0UFjc languages/scala.min.js
sha384-Q5oRR6QQN23wSGycG14BLzqIYm7x9hgpYDjcDc1DEiTEmhmLjyCgbfBvNi5tRm2p languages/scheme.min.js
sha384-rWFzJrCBbKEVA1LwJMHU8ry3qDPf4upXlil6tOROOEaPPyXkjo2q0Ck3oser1s4M languages/scilab.min.js
sha384-DddkPXKvED/siFRT/YxqdvNBhEwy3VKbNmNDzvXCsWBD80UWYncxDYrRoGf4deCi languages/shell.min.js
sha384-b3tUMsL9jjF1ZlCB16vofSMJo+TwCyjnGbaX5J8TXBVwCHtd9rD7uKZ4uhAASqMM languages/smali.min.js
sha384-+K+g0n79CsW5uqqcT+HYein1FHMuZNWHIDVjrrzw1lnMsYvVcoXCQQ/xWwJdKITs languages/smalltalk.min.js
sha384-kZjxT3RBHYn6VqVNZCTT8QZb57M7F2geZHaU8u/dXwTaCeTVJrOpra0Kl8C8o07k languages/sml.min.js
sha384-X+9ZRtXw8xfTgUkkL3lzwv0dRH8bNfomfgy6PuFv2iVgkKFWT15+mJNAsMw6S/bb languages/sqf.min.js
sha384-NIOZ0af0WrbvXjA4DTwRHMG0NPrSKKCQAxR5df97sdIJNK3A8a3G+KVSyK9TdOdB languages/stan.min.js
sha384-m6GBNS7wqn55xFdzMveTbitSyqeWQZukGYUfu9zEToyxiFak3Il7SA/QasTljd2b languages/sql.min.js
sha384-jccu0nl9y0OReZamNAUotxVixMFWhWPE8FjMCvSpuU7ewGo4vVwurA64UydCihOT languages/step21.min.js
sha384-c8+/div8AW4RqyfO8xM3o+pwssvnSwFacX44OXt+1lP33exYw0bJDIfnwFAW4E6N languages/stata.min.js
sha384-yxQ6EfzzwdQT3F352KMJil1yKqjBKVhypG8h+y0pvhH6UPY6yKYp2t9pFHqbxXfc languages/tap.min.js
sha384-IiP2LptrW+j9QvHZpTX3Nkzj+gaDAnLfmMGUt/RcQSkoeHtabGhWvPzfRyKKwJwH languages/subunit.min.js
sha384-tLi3uB8nvVAs5R9Add6Gb5hj8T6Z7WzXF3/WgUNocs1Z4QX48Zx7uG7/aZFkblfY languages/taggerscript.min.js
sha384-vzbC7tmvm7m83Zat456sTMwmCUbJx/MIv25KxhgsSiFCyRcCq7Or5DQs8gwuypVU languages/thrift.min.js
sha384-AFWNiLkhp+0xKfUBfybKsaVklX8OHdmtbUHBqTjgW+Hzq6ZDDuTm9LirTEg8ba8c languages/tp.min.js
sha384-Zk90J3eDf6bC+kJ7Grh/kOFY10ECdJGaiCx5Yz8TYOz5FKwEjyudxOJZ9+HwAd13 languages/tcl.min.js
sha384-SynMm1Mu7+eo0EO+c/4Mc7Sj87Hv1Sr/V/AYbuReyvOXUjvNV3tB5LztQ47bEmL0 languages/twig.min.js
sha384-45QR6XyNYRDsus+yrKz+9cPYqZ+BMp6KI7FRp0cZFijVvKeOupGOYUps0DWMQJ01 languages/vala.min.js
sha384-JFEBAqdRU5iC2Xj9eR83hqZHl7lJVfiU6TSPk4iFL+okMV8iApkmk4yxViynh7om languages/vbnet.min.js
sha384-vzirmlfHliUqZJK+7sYek3tQZTw7zqZf54qn59alktabEKvw2UUkk66Ga85Ocz2n languages/vbscript-html.min.js
sha384-umy2BQoJStLEOyDPsF8PwMj+/8JjlxWhRGb1+iSCzQuNyGj+S7lPpJOzKJkbCcv4 languages/vbscript.min.js
sha384-xD3AQfrz2lBmFqB5Fi75Vy28xwyhv9x2Vk6UC+xar6SHvc0X/eOlV+lUU8Mk4DGS languages/verilog.min.js
sha384-nwyzo9kIg0gvjYop/3MopoMjFoDQTZpywL4KPxx99ErjHbPVwfhqAVEpKb4UrbgV languages/vhdl.min.js
sha384-MN6Hr3b9BnCoWZ1W5kw7jsfHzt1AIVA/4CwXHnQVrVp5MC8jkoF/daHD7YlGZ9Mi languages/vim.min.js
sha384-1n2pmiG0Xc0aqXCT/abxDlOTFBGVUvG0+i5Ya7vaGg0IjAhG+Zqe5fxR7u+lfk1a languages/wasm.min.js
sha384-uflBECd2ZDuAnlWtK3arEutYHR6Hx4K4FsRvmxqqHo1FU3S/XTOL6rhcEgE8dNeT languages/wren.min.js
sha384-H67Kcw1XQmcmlpWkXADPdiAGmxJ889j4ABf+4hxztIJCBkyywZT9TN+cvwcp+7FV languages/x86asm.min.js
sha384-bo06y6eLWr2Ytxx/ei9PUqK5l8II380iY3VJT6MrbOhhvmxsTjNy3ZLcvHF1h6yN languages/xl.min.js
sha384-y0N5WpxWGm8v4ZDI0gPt9p7sD4yQdzTnUIweOpZfQgNVDBsyweKXIBdfEx+l1/oz languages/xml.min.js
sha384-pLO+1Xth9OmreohBAUHWyqJVOrZoIHqy1v2VVmALKSHJgJnkYaznmcq54k/rmh5z languages/xquery.min.js
sha384-/AeWwRmTkPQZMeNcenkrP0J24Ldd3jsXgY0QuQwXTR5Ocq6+QqUDc05dHBk8jRDA languages/zephir.min.js
sha384-k06Yr7s/vDfyYVR53/9tPgaoSZV4i5Gl071fBtpysVX17qfrkzwNOU1DS64VL/Ee languages/yaml.min.js
sha384-6hNJbDNKFgaPHIHYJU7gH+TubnQDq+pf40Vketk1fGxvOe/rQCtjBppHBzx6xcRb es/languages/accesslog.min.js
sha384-BDHF93eqe9ubUU4s4IZ4F/ITyPdAjLo6FaDwr2tynte4twdjFrNvhtB1cqQJJeVu es/languages/abnf.min.js
sha384-Ni0v4mlzwsAdhT/H8oCkIkyoyn1Ecg84Wi9hFS1SeOAcWz5vhEr7At/KcOmB3ndd es/languages/actionscript.min.js
sha384-HoigN2S626mop/o/fir+afc/BsJbXEIlaL1Fq0Y+Fv2P6aQVJUPG7QUxXt6CkW8p es/languages/1c.min.js
sha384-xKTdC7IOe13bIRK0fIkwWBb55uCcRn99KdeV89OF9lo+tJQS5nvVkauwZmLRFJRU es/languages/ada.min.js
sha384-1U8Wo1NwUCLYe3/04IwC23hTGBb60yxA3aexaf/zeNewYKw0ggIkEk8wjdtIUuZt es/languages/apache.min.js
sha384-ipG4j2ReF8YDdHtk8TqCV9OBgAGPLEeKSVXZOV+RsjcAH3gkaBAmk+2Tip95uE+w es/languages/angelscript.min.js
sha384-zOCRBsNwgerb+twFfn1VEbahRyFfvRo4lNo/x9y4+8cGlCICauDP/f4FP4J2TVeo es/languages/applescript.min.js
sha384-AG5c7ayjNqYovCIouatXiy2D0o3OjaH4ehj2Q8Og1YjEbwqzSP25c19NCmoQPwQ6 es/languages/arcade.min.js
sha384-HtTaZAcn+mfv4W9pgynXeGeTwYFeIuKzl3uQ1o9WYIq5jMzjumyVwXaix9JkIPXK es/languages/armasm.min.js
sha384-ItlM4rlK9oRLeuicB2G3B6zLaLMkcXzqE2b4kdC82BLVh0vBHzaD7LyiU5LljxpR es/languages/aspectj.min.js
sha384-k3Wz7WWbBLBfeE4L8pBCl6fAnvLWLQ7sHm7r7D77qudjylPLWRrIMIM8iLQqGjPe es/languages/asciidoc.min.js
sha384-fJn0PZOfibdciD9wxpyrIY9AReH8o+9oZw9au95TImpsRZIpqZ0RGTuOe2Vkh+iE es/languages/autohotkey.min.js
sha384-PvYPlsSm5y5PRWOH7VvoDRrObfm1RyCn6aDkfqwao9WR0wI4DJfcPDkN7DpVecf5 es/languages/autoit.min.js
sha384-EJRkYBBHTsVc6lb0CW6aL7iYmR5yFfzW6Xx9uoGgwY+Pk/3tRy+N6eJgtxhYyZrg es/languages/avrasm.min.js
sha384-z1CbBzqYHmapE4FlyFgXfbQAViUywhHZhiOatsvzq3e6LDbVepYEgSBM6zOdQCOc es/languages/awk.min.js
sha384-VF/QydK40f/xwtnYlqksa/66JgvMUGZ5mKYur/aOBwK3wi1JbQxM2Aueil5C+G9+ es/languages/axapta.min.js
sha384-qBp0j9DXq/fF1GD2w1urD/3O4iIkyfAdAyrMhS/ab4MO8PToIBkZCf9C2l5u2Kcz es/languages/bash.min.js
sha384-JeuP+ti+D86dmG+vpXfILVUwgA6xjkUM7I0F499QjHNY4K8vBDtK9tX2e80RzYPJ es/languages/basic.min.js
sha384-XUe0qxUqevot+uscwctHtX2s4miJP9k5g/PwFENIwf3uaXbt/dsVBGcNMnWiOqwp es/languages/bnf.min.js
sha384-0Lt/A8EfQCF+55+DBGywc7Qc95mKQda8aYzg6kekEvZ0xRXZ3apQGuXFfNhf7Lgh es/languages/brainfuck.min.js
sha384-iixYrUbQ7VBARXnm8OSBP8M+ipZ5iQdXtAk/QzmqCD/J4X6je+NBb9zln5VGbRd8 es/languages/c.min.js
sha384-PttWrSfX70oF6UVe5FfvCmTOyytGvdPVB/WrzjqXgEc9sIr566bSHsZjFfxEDcrv es/languages/cal.min.js
sha384-IeOoaMynjmUlgFKpwVknt96M3Y9uJEKOeS+xRaloD+zF3rxhcr5JYDfl/k0dFfZJ es/languages/capnproto.min.js
sha384-RUme2fKRueWNk2epge2NJ4oet24qjui/GdY5txGtPm+pSYDRECtFH0Ze3eWdsGfJ es/languages/clean.min.js
sha384-oTK9jpKAWAXSNx7dhF5Q+uQm5oRPuHUCiu/LFQ3WR3cXZARq83x2uC4uoyKjJPsg es/languages/ceylon.min.js
sha384-9EyrmBPiPZyxskA9Cnd2NxA/gKEK2Siy8RT4X43fG8Ee/Sfjh0geRA4uqHlCNAOi es/languages/clojure-repl.min.js
sha384-ya1AADwTwztqlzxxAU3NP5Pvqk4slX9nLjhJtZlaWLPiBUpANqQFPxMHHxDG/f3Z es/languages/clojure.min.js
sha384-pJpe9KKBnJoqm43zyRkle6sZendzzQtik2YF6o0/onVwtT8cxsXtVbAAftOtCY/2 es/languages/cmake.min.js
sha384-3BjAIkHRuWN4J0/aRFViVZi/YRir/+gQDOPhinUiQrhZfITo+aVDvaGFvJrib9I1 es/languages/coq.min.js
sha384-WhrDE4+0QBOkzJGew2dr4x85fABp01NWQCdcK+AGSN40aLa43lwsVABcsAHQpVqX es/languages/crmsh.min.js
sha384-RreIDL+ZjCrGnPF0fMqwG740HSqLN3lXeZVoq5uuozH2tauBlIJY8pQPvOCCGzZj es/languages/cpp.min.js
sha384-5iNtUc70fvyZ8nGnxgqZ/Kf6GwAPWzijzjv+UoLI/CbprvYTezjvi0KkbUE1qCUf es/languages/cos.min.js
sha384-CmQhm6JsrABKaopQnzk9dGzWvrAc6wZgKLTbQUzcub0euCyfH+q9E4m3DYG5mUXb es/languages/crystal.min.js
sha384-B1bJ1qAaXr6tmIKEoG2TAGTRk5o87m72iMWvnxwI4i5sEJjTirCcvl7/t0Qq97TB es/languages/csharp.min.js
sha384-JKedDTgwngR4hDCpWlSe6OT8Uzj1sn1OEHRnyG9YbLSrLmfBUzNk0u9wyTRq0Su8 es/languages/csp.min.js
sha384-iipQb+tLCYJ9M0LtPiUlGCciIqEW2VTor/qCBM+yeaRVKIFpM1ElsA6MHtUicJ7U es/languages/d.min.js
sha384-f0j5VTkp6OcaYWHGUN1D2YmLc0ruJtOoyZK6mekpuX5WpkjZJHOuJ+ne/gdZm4b9 es/languages/dart.min.js
sha384-d074cRT1WXSro0huQwF0K/iIiTTLLyWvDedtjETJ0WM+zVKNnjTHucegCg8LpDVO es/languages/diff.min.js
sha384-fYfP/rvKQMfH+efGGClCM82I99dwIrFkaTUzY/qwYzxdqcy6QC1sn8Z1QFhoopHY es/languages/delphi.min.js
sha384-QwuR7C3snhdGBvsoeaibRqdYDX+dFnwCiIBEl8EN7+kOXpoWYvOD1SjGIBpEzsj/ es/languages/django.min.js
sha384-gk4ki7z0Hb0YBwvPFi+t/5t8aAXA+OqQ0pLP/RIfOhLesvEx4RR6f2iMmLMgd17/ es/languages/dockerfile.min.js
sha384-iRO3AS/GeSiX/CWhqFxZAkCnLKVd8Kxq5PaJXbcF0Ob5/8KgKv1KO0Z/2nN8e5nx es/languages/dns.min.js
sha384-QnZZlS9KM8qOtRzGLtsRT63jC4Xnq6A6jlsIveeTzXUEwZuHb5WRw5BuWP6tsXWU es/languages/dos.min.js
sha384-IFwA7tcazHX7SzUjlKnxNqGeyzF/qfE5/0xiQOFpDYXwfNPJZkCPTF+Fs8Kis4zZ es/languages/dsconfig.min.js
sha384-5I+BVr6JL8cfsRgv1G+k0zF0Yy/c1jPH2mU08SF8sx0nNng5v8EZoEQjQC8IEQek es/languages/dts.min.js
sha384-ozW8CcVXtiAYIF0apCoWX6gUF1qVZHr5M3Mltd4ee77IwZScm+5rz1D0bwFVnO7R es/languages/ebnf.min.js
sha384-GW1XvZelK88cLEmL5QAOsd2tec00AOXcyhoQhv08xRS+DjUr9P5WyCfl1DmwsMkP es/languages/elixir.min.js
sha384-qG3akfRJ9PkkH9NgqFpmz4xXzK2dP+0JNXa7+b13PIeMLVuZwAPfSaapXw3V0X6k es/languages/dust.min.js
sha384-XD+A7k3PJZHVRHa6VvWYsq2ng4LShjz3VuXQukkA/IvoVhTepCnAiAk6vzU7r8n3 es/languages/erb.min.js
sha384-3y0W2OuVhpQNh34lvQ4LZHPGwee+Cq1Y2v3D1ySYawNxTiutF+AsA+acbp5JnTwY es/languages/erlang-repl.min.js
sha384-JpqqL4iDFf+aYQy8oBhIAVSSX9VqAX2NB/9wnFxyJK3er/t6rSVHfkMlYkE3nQS8 es/languages/erlang.min.js
sha384-psToW64/oumZ0ArTzsdf2Qr9rXy3KVktmeLEp1g3zbB3r8Z65dqzkFjcrinLlq7U es/languages/excel.min.js
sha384-YcnXP8TG4y4M1jislhn08OtYeqfLLeg6OboejQ/o4cQt5Z+YtxXTsTnfAwZFG4dv es/languages/fix.min.js
sha384-kmUK90oK468xaaRPGf0D2gwUosX2dZmHE11ooZgvfT/ux2ztUP8ChdHZvDGtPyG+ es/languages/elm.min.js
sha384-Dcko3NRylV84OvzdMqqMKIWc3jkhbO6oxdF3Eopp46RPmswT68YL7kD8dIUWQPnJ es/languages/flix.min.js
sha384-yD4LfcDDo2+haZpC4c40SEGLjlRvkNk+lnvWO5aRh9uNNjn1ZQtzIhLZMj3w05I3 es/languages/fortran.min.js
sha384-rT1Emgp/LIbwX4eYEm68sfEnRkKExMJzKCkeQXFvmKdhFu0tzQUKd3k1mVmc9hTN es/languages/gams.min.js
sha384-SzG4HdwQf6IocGU/L13Rsda/JxDDtkT0Jt9sSgC57qMZJ1ihIvqYlrTc66Nn12yE es/languages/gauss.min.js
sha384-L7EZOHJpSOwQimAOiPnOpl4IYGQJHvHfFEnEuR5MzVGUFN2HliUtzxr83szvUhZ7 es/languages/gcode.min.js
sha384-OWAc89pqSRRUHKNhP4VylUYVVXDAITQHAukcRmk+TgaqcFy1NNC5XBcMBADibSzQ es/languages/glsl.min.js
sha384-jCp5qaErR5fkJwl/okFFGvb21MwjZk1a8EYW9qsmvEtyi6eUcQxKM3PFQGvr93WN es/languages/go.min.js
sha384-sDRvkpogjSgNm9Wn/5oBBxMcF0EuDVfLXSoolEKxKWQaEdcVoJezkyapt8QMxED5 es/languages/gherkin.min.js
sha384-VdRxYoiWII+78RwPwaYHwZYHjwwfgWfyUiK2hNxQg8CFdI+WL62OJuAAMdafHNAg es/languages/golo.min.js
sha384-M2E42NZEf9bR4Q/NhwWsYAXILILXtyEIJPzzbBxN65E5uArbzjHtGI4ZP8gDx8uC es/languages/gradle.min.js
sha384-11Mbl1K+9aDM/UqnUY+G/RPOvV+beTQ1hen2PuTNPxOEpV6Fp115xZVRZsZfHcCu es/languages/gml.min.js
sha384-A6IWM8x8Uig6kl8kPhzhp5AeCb9ozQCXW7N8hX/NDCIhat4YoLxr6Iy8ky1ZdWm7 es/languages/graphql.min.js
sha384-FtuYzFYxmk5GLKRyOnEV4AD4ynFey4Q80DTH7f3Orqcm9lupgBzDutWmjWKM9RPV es/languages/haml.min.js
sha384-7msHt+NuZ81XJkRgV7BNUridIIj9DbwwVcY5n9iB+Eedckl3NJcgJlYujjkBOIdT es/languages/groovy.min.js
sha384-h0E4MvMNcxTUs/uf4ZBc+jTedk5XV8YNwFHzUkx2Dogm+cUL93YTZ2L9hX/XOumP es/languages/haskell.min.js
sha384-c/+T8mR4oZR77QH/0MWQShpYECRQTnub5rI3jOiqljRQFqozXlSeNV2LkikjLC0b es/languages/handlebars.min.js
sha384-C6snvXOb5mQ/Zlxjw7THcdrOdpC1bPd6/oO59U3UWW8SMaeEvcPS4asErd4YmGjh es/languages/haxe.min.js
sha384-doKNWda4zFmGQnOlrCLGAQkB7cm3Sp8yhotjWG/TY3p6N4B7BF3+6aY0uv57/HnP es/languages/hsp.min.js
sha384-wh4yCR51pOWF48ypxH4uknOUxS5QgMFz2BaAbJJF8EgyyHI+4stafw0hX2SKovRO es/languages/http.min.js
sha384-FeINSM7nmQnVg2FDpyPUGfVYNuIrzcBb1N2cSEU02J4Pcb9XPy96rdEYCCQk90IS es/languages/hy.min.js
sha384-Bc6PDByQk1hBRCB9pn3PW/ovTjbG6gMRzpRvnG17pjG5gSszpRyVgVBLsD0Bl8Nx es/languages/inform7.min.js
sha384-mJbm/4O3GdsKqkOxlab7ltRSZ8FV09l+9faCPF9njKbAiBWJqnAYKTzplcL91Kmf es/languages/irpf90.min.js
sha384-F0/Wn71XAmO+OO4N2LJkQmlg2hxue3N/IytZ5j/qOwb4Zoe8t5kJtfWHlHuF1gkr es/languages/ini.min.js
sha384-5G23VR6Ca429Xqe3UfxUcA9wZOdkx5xKxrE71SUhRAGz2df6Y+OwJoaZ2JWO0sWs es/languages/jboss-cli.min.js
sha384-qO2/1F2/MxXoWgM6uKpwH7pCxqiVv8sBuOlMPSgzb8LtpBvxQpvw859y8aacIa43 es/languages/isbl.min.js
sha384-9etvGv9UZlodP+f8QQsDgn6WLrWB8fyTBM7eUUeAqUxdmU6zW5e+Qj2Gte8g+kcm es/languages/json.min.js
sha384-TIBdMNM0J7k9o9gH+WL6aaOaMHLUtZm2EwHYfzNgIKjYNhtxSHvNIwx9myS7z0g7 es/languages/julia-repl.min.js
sha384-6h++W/gs0fa1//hLBeiI51B5h1KgzEdS2oQuPUvmKbN4ZWGeV+xPe6tfPkh810lp es/languages/julia.min.js
sha384-mBWPUdxgceGW5O1YPgMNQMJTU61a144ZzK0HwORCNF+GcsssNkUxne934A/TJ+o8 es/languages/lasso.min.js
sha384-+Hpce7rMaQNbyKsc7e6Cta6nO9n9RWjN+2vc+VtyHAd4iglUl/hz9klLoigZoq25 es/languages/latex.min.js
sha384-Zb7obMNTYIjUEGbV++q7aB4RpJfV/3pZjQAzLdqx/beAidtNk8rCfNVRyr8RYAib es/languages/ldif.min.js
sha384-m7amVwKsJTmFMOpw2oic2v10POI1ajYeIN+P0tNiDvpdeic0UFnX2a2SuWfY7WsJ es/languages/leaf.min.js
sha384-wCN1tf65VFOBY61CF67Uw8r1CpSJIJaHSmCA62AVVAEMQdWYDXJB8PsuQ/Kt7hIL es/languages/lisp.min.js
sha384-BrnSMC9+TUnGbG6jG8earQKaTpdLnVcCcnMX00NjAbA5O0AjKq0tAeo2gS/kj7cm es/languages/livecodeserver.min.js
sha384-hsHywsRkxdz9pXNHRUT8e3jryO4A3SvEBHxeb/MJ40642r42t1sxsNqLw4nNHtI+ es/languages/llvm.min.js
sha384-PtGDYPQidFsZkQR3XhB77+n+5ZDO2e6UQF2k9Xga7yxCiLChmql2D2tRy3GIUkaE es/languages/lsl.min.js
sha384-WhgK/GKYChxcb2d3wIN6mbhECEvxHApKKbH+RWXiEQqjRFBx52g5I0aj4qlZkL6D es/languages/lua.min.js
sha384-1rcREnbxUB7WIAFFhvi4FE+KAxMaAN184dZMV3bH5WA5Yok7lsUfXmv9A8yKSsC5 es/languages/makefile.min.js
sha384-JaMgOEsxsSxsB9guB4ydH8mOhfnPskaPwAerYJP2xXSrfh8KOAnV8KA8Q8SGotWa es/languages/markdown.min.js
sha384-y286TihFePczTG2aegIm4F+SVCIAUel3L8bhCraYGA++e2V7LhLtbw/zGFL00jHk es/languages/matlab.min.js
sha384-/k7YIqav+AgXCTj3DG3ItDP+O/KbrPzJl4h7mvVCUU9Ysq1uH9aZtUwrVO3xAI3m es/languages/maxima.min.js
sha384-zSo62JRN83OYSPEgHHDRQE0PYboXn8xVAMZRFh0yfFD24UFzhiughJyEE3Tbhx3G es/languages/mel.min.js
sha384-53hCoQV7TBn3jtL8SjdA8DvCBdlpl8AxFVmBH6VAwPT0pqZLslVyJwWAsDHnPWMp es/languages/mercury.min.js
sha384-U6yo0vFxsu9htZO8fwRnB4jSEG7QjTQ7b/kFnYm8Vn/F99KIMKFWFplWw9uJHByO es/languages/mipsasm.min.js
sha384-l809CIz+Yq2Gimat96sl+ZIZSrthm/uK6OpayUAWd69PPRyib7OA3XOj2r5W7o2x es/languages/mizar.min.js
sha384-F8FgcIxRNjhmti6yELSmmOR5twEAIyMPf9rOv1zienptFq4HzuKpOytjFKdDaQeG es/languages/mojolicious.min.js
sha384-/IzpgGPt3hn92u+SiTikX01/3d1hK9hFgV3eNrBLf4CDKyo+KgnvPSL9dZhp0R0w es/languages/monkey.min.js
sha384-hNd7zilN46ejmYFub9f5MnjD2A1x72+p4uGDBO34xvAAEb7r6o/isGlluk3gER5/ es/languages/moonscript.min.js
sha384-Vf0QTEfrvKt8hSqfsteAvlo2qStHZzqxnChogAf0Pqs2iMnkvjLtP1p1SbDIn3wn es/languages/n1ql.min.js
sha384-J63zehYA5adOwz4DKqhG7tTzRWCfICXvNOk4zIdsSMmZyyqJKXlSfdKgJWJ4NLsy es/languages/nestedtext.min.js
sha384-tyCpAoZIyj1YuwDvUQaX8yQChMn194GgZqezy0YFw1zFgckWp+NRAFhO3mNKNqYZ es/languages/nginx.min.js
sha384-Rp+pV41XyS4V5iykdNjDVI/JcYR5eyhlQZdo07cLIXdfBh6v8MTAsfidvfB5xLor es/languages/nix.min.js
sha384-W32gCo+5oE+RPSDFBlTywg8kek4ktbtVHeqn73XHADIetuUTN8AEMrmpVX471mfd es/languages/nim.min.js
sha384-V5+zyeTm33k1TKBdwgJtWpq6BzhQENbHmMX4wXd3OePFXd4jniz8Rl9IUiQagPEG es/languages/node-repl.min.js
sha384-Tn8Xob0J7nagvvL9cCAoVhthR2pXNS9iZj62lOHFeAc+sFNC5KuBz7aMe1iWPv/x es/languages/objectivec.min.js
sha384-KwYVzPte7Uzb4dnMMLp3/WnzDMI4IoodRGknFVu5wNGkEKzn30U0EU2oDrgrrXYH es/languages/ocaml.min.js
sha384-44UNm7+dWeYQ8SeYG+tNs/3klmTxsNGSkuKgnqNW2CsXzwYESnIV5LqfFP7psQ83 es/languages/openscad.min.js
sha384-mDtv9IMXKk5Lp/WBjPHoawVIDvmCmBCa6qvMXFnTtYkdmpNGlOOc/+Zzbwao5jkS es/languages/oxygene.min.js
sha384-i5vm+x3jvv1JBRy7Xn2pQg6n+LcIAb5AvNRxhrZPl6nyFX+52R6CRHlMsQRjlVwn es/languages/parser3.min.js
sha384-VWKI4l13cx6vxy4zaa5hZe9NIaY1LATdDiJ7pvaG3uDI4I9mZjJE7PVdUOEJEHm/ es/languages/perl.min.js
sha384-JCLfbxUz5TzMCyjJoZu2o+PsvLdXls3F/DiXoL6FIsPmJsz115KitK63MvgJ4BeS es/languages/pf.min.js
sha384-z1GVl0FFoxhHxYkROV+I7QM45QCZXFuGPdqh+qrGObM0BqaDMG7fxS49Vrb3YHx0 es/languages/php-template.min.js
sha384-9usW5J/BmdC3rYfMJTKT/6fC9kxMb25LXgBOpxLVIzvYxlxYkPeJTh4wdRbEkRn9 es/languages/pgsql.min.js
sha384-ONbkEZloDSaKm6V184HpfBQCCmnM9G8xqH+sUy96howXms32yyCtzsqyyXJvGzL9 es/languages/php.min.js
sha384-MsfyRO6B/+Uxj7yXrY5OyNou8/zx51ZxfMNWRYD66GKF6tK7vhrBxN1UhTNx1y+f es/languages/plaintext.min.js
sha384-Wc4sJzT+I3Eq3jhW4bIMs3NAssC2Yu/RQqAvJoRBtKrDae7sCbBxKtMPbiTatAMT es/languages/pony.min.js
sha384-2GH0bLTrPzfUhi6FJkCRijvFRk+wuZ8rjhQyjNSyZsUYmXI/KNevd1z+1EqDCKe4 es/languages/powershell.min.js
sha384-Wby7e14X8MLl9xGCwbyDZ5YBg6B7hrmqYzqtppbFwK8d6S/MRtUbs82NtTpN9bT0 es/languages/processing.min.js
sha384-8ahjAoSsR2V55SaEpGG0+hl6OjeK0U6o/Ts4ydGjSFGKV08be4eEqudvu0L8Q3BG es/languages/profile.min.js
sha384-kUCQesRypX1jE+n0VDbhmaOwWhzUPAy54KhwaIzE0ReBjqKZN58X4uDrEKgmWMMW es/languages/prolog.min.js
sha384-9vgWiC6GC6CDSjF4mKE8hRa64fNxYfWpyFRBkjonKf+0OHf5ZsgSr7EipMwGny0u es/languages/properties.min.js
sha384-gPz2PW3KC97HaXk5hw8HbJiH09slSEcCC5mipLywMIFRw1M4vOS4Idn7Q27S2SX2 es/languages/puppet.min.js
sha384-u7+kjTPYn86uh9Kc4kEiC9q4Lcth/h3aGLGHiwBw+1ElMJl1nlWMNglJ/KJZ3iJt es/languages/python-repl.min.js
sha384-T+Wk6jRFE3aF7ZUMETh/KiGevzpEKtnuBV6Kj8n7ZXOh10Amg/y4GvJb/JS3PA9M es/languages/protobuf.min.js
sha384-BcP/9zZ9jaNWU81HE6ZWQ1ohAdTmUNosHa8j8IcvxYTO0ewArWbEY7NDUkd1FWGS es/languages/purebasic.min.js
sha384-sP0rDcLcnvSL6MY7RRfMVrIaOU6OSEkKJBTb/ekojxJP1VcXBA9gCqYH6yuQf3Ug es/languages/python.min.js
sha384-7e3q3QQDjs7AZLQq8P0hZvvoQV6Ncr/K/0/t0Kv75GPQMw3DsVYDT6TU5NXfYfgz es/languages/q.min.js
sha384-/Ynwao0/QO2Dp+1/u28yqf7ZLdyrbJKDxviAMNJXn2ZN+2L8FqzlQMUzmlpsCUh8 es/languages/qml.min.js
sha384-v3Ye3gvprFakruEn7fQbxOgKvPHVxsH/3g0O7/uZ2aByW6euWPHDpn55Kk9Ndlui es/languages/r.min.js
sha384-X7YojXdu/QxHfI9NlS8oY5nYqzrODYTHIJZh1DCh3xp8tbkWRx1RpixgZE8af/3Y es/languages/reasonml.min.js
sha384-83S4GU32y2tS41B6NcFtFFhnSKyhmfR9QBFa1p6jPEX/7YJQCCqcRF+BxaaFq3+t es/languages/rib.min.js
sha384-Jj9cNOCcfVOH0zg+p1rqHSMkG5Muw7zt0FaFlCfKT/7bkuQQ6SizGg7aF/+BHn9O es/languages/routeros.min.js
sha384-8AB3nHYRVIX8vRQTLlHlzC8Zt7VyrA/SsDPit+b5qSAAASpQT6PiFY1pkZARXN3y es/languages/roboconf.min.js
sha384-QUJCQ0AS0woAuNG25q+g5V2DbzterO9BBAZhRve4+0mCEXlv2dU/lkWu0FLXjurO es/languages/rsl.min.js
sha384-tMh2Z61aZXsS9hfeefR5FD0RCwBWlGEKdF1fS9PnXZp4ZJZL7EL67O3St7VmatWV es/languages/ruby.min.js
sha384-AndWO8bLPz41I/txGDeHkoM2wfnXroz2wjystnWLAf3OriEJZdmXzTnfG1oFdvNC es/languages/ruleslanguage.min.js
sha384-7Q4+3J1HvyKSfcUK/gxQ4/CSw8HHgE3MJzhbgncpQm7vNPwTLjI5dRsRZR9NjBY7 es/languages/rust.min.js
sha384-3PyPE49lBa0MVq/7GEUkPl1EFwXzEY4hpMlnMqkKbK7eXbuqI5ZsbIODTMOmIPpm es/languages/sas.min.js
sha384-yWWc1dZuMh22zKnuonaq71q8bSYstXmlTwrSCZfn9pPwVj6uAm18d+3QyWANajKH es/languages/scala.min.js
sha384-d1KfrbdgWZREDbXwSgWUJ5aHfNvPQMFr59LlqSBl8g+95lxbJkzANNgEiQvs5tWo es/languages/scheme.min.js
sha384-nCMYsKOsG7C0/zxAY+DraKjbG2AWTSk6y1AFVqPJn/7ubqoqjtUlt6AvTcicGl71 es/languages/scilab.min.js
sha384-miDEyDdoC/3nsM0AUVqDJ1cqPOxvGCwQ2R4kcGF5cRx0/jEbUQ61x8H4vhyksqgA es/languages/shell.min.js
sha384-7GSWtUKm6zZZciXHTyoGTsmP23yZqB4l73ojnMw10J3NxI2Qu3P/T1eFoBFvbeaD es/languages/smali.min.js
sha384-9x4RrFR6Xh0DPuyxZSPzQPjxlMnbcYSm8MwdmMKai9a9qrY2sXZs2pc9kydxhFrL es/languages/smalltalk.min.js
sha384-TXZeVgxEWFPpVpbgEvCoeoxDEMgWDvnhZIlIC+6G74wEoeuUt9JioUe6kc/y3z0Z es/languages/sml.min.js
sha384-QmX8suk8V7JqxIVePnX2QrgKm4LfZOqJfBluxMHcbtI3ALZM9d8+sxbJqOgtZXpX es/languages/stan.min.js
sha384-cOfzPna5SKhnjzakaywM4Ye7PtbNYUDMqCPAASBSG6DIMl2ZXlOU6ZS5fACASrug es/languages/sqf.min.js
sha384-N+X6tRELomogEjDhJminOptXVy3WycOQa1hQea/aENPZlrsEB3uR8BzFKNkQEaxT es/languages/sql.min.js
sha384-uN0HwJTxQEuVna+HaVwctpYNZPj/5dfa5f3RYWTqhpoVnGcIIk0fmg/iIX7aYIMT es/languages/step21.min.js
sha384-E5YkSKeWgHYrni1pFFZgAaD3UmIbFwubm6kU69RyMDIwyraM/aR3AO59WPqDeVE2 es/languages/stata.min.js
sha384-Tk3avsGRD9J7bJ+XhGO63doWUzlIPIzR+hJ+PjMqlUHa+3JZPK0OURlTT92EE4ne es/languages/tap.min.js
sha384-i2aOxEmlE6M+BMCphJM14OXz8Cg4xmFntGpL+d+vfCbT61SMNxluVu/pgZ0hO1T1 es/languages/subunit.min.js
sha384-zMqyHvEoTYuu79nApPJpwPx6OQevf+X41Gcc8JByndSetw55s84K15npn8B3PdnG es/languages/taggerscript.min.js
sha384-mu7SjkX8YPR9+Nuh3WVNZ/u6TF26Jqz7QSvyfzCg5RhpDsTkqPjphNKI8aFW43xm es/languages/thrift.min.js
sha384-yCicoRDPie8MzqfU1Jv7RAulQHhoT0HD6Sh2+gIkuz1jsyZJsakeDeaGojaIdPl9 es/languages/tp.min.js
sha384-iR6YmMxOzRGD4f9IJQwNq83qXrEVQyTk52KldPiQUPvHRCs9vp3ktGrI6yDwe/0Y es/languages/tcl.min.js
sha384-WqilSUEU/eTfkl27uR1xkYhNh6jvOducSrmL1BgK7PzoSG71OwsjEsKLKMJWZnng es/languages/twig.min.js
sha384-MR8eJGm/WBSXkF3HngrXbWwKrM8m2zo78+RzEb/lVH0WY+mU2+Z6W3fdJSTfsSv+ es/languages/vala.min.js
sha384-HLi1UYAZxXolPaYcpldi1c+CRmj5P6cvjQzXG224MDmVaOHyEQ5q/VOvBxFuAkSN es/languages/vbnet.min.js
sha384-URWOlEpxntaaduHKdL12UpJl+CNz957Xp/cWVrG93McqIu4FYtk9PQMeLwPfkypp es/languages/vbscript-html.min.js
sha384-3dJWdgNw5tp0yjWK8DDdl0UfY+6ch7DK0ExTuU/l8eHLYV3ASAlfKXhY0iHRWpw8 es/languages/vbscript.min.js
sha384-/kictPjPIucEjr+xqjJfX9ceLOjCqYxFfP7ZIZ5V9qvGcfCKlmA5tDqXajNZGxqj es/languages/verilog.min.js
sha384-cOEsgQapbfu0Jeli4fyqt3rUZe7Wa6V5O12B0K3Ktz2b0OrGV2tKs3e3fauZqiap es/languages/vhdl.min.js
sha384-5TRJKfOWfMuLHudVY4GlWaoKW7DITPMszwEMmE3LgzWWv/MLeL4SBCtz22ZFZjxm es/languages/vim.min.js
sha384-ubkw1T1jnpEKpIYUudkl2z5nl7fuasHMtZoy1Q9ltptP/xISGsE+nrT+DP/P4kl0 es/languages/wasm.min.js
sha384-pbyLx0jIORnRSGM3yOEWdkILjzXbuV2i/VVyY7/K3u4UNxp2sPvcoVv7yQQmF/Tk es/languages/wren.min.js
sha384-Tu9y+uQIR4ubDS0daovbBhEIx8Fa6S68i2H+WBcCv4YGPc6Qm6C4Q0TLXwSjt/Az es/languages/x86asm.min.js
sha384-RQaqKj5N29Oip9samEGEDXZPX7H9dU7zEFD+RlFLdieBxgbNW15Epw8job8dVfwb es/languages/xl.min.js
sha384-kGUSuiEqCtc15ZFZF0QjJyAbVZKqbayoIieIT5smvTzlvBQLfwJ7VZE1SW15ZpdL es/languages/xml.min.js
sha384-F7LNFHNbZo887ozwsdZ8cKMRt8jv64KstMYz9FPJcRv4bLTUWiq4xNcmVtvL0QiZ es/languages/xquery.min.js
sha384-sMsG3b8QjLAlJNFk3wYpi7aMAB21PsUqxh6mMJTp5iqyhPcVydQ2ycV5x/itQ890 es/languages/zephir.min.js
sha384-0VDmruIrWYjyKyNJpUQAA6D8HDvXBhJO2JBi0uOd9ptE5vgXWKW8X0vmm00OHYaK es/languages/yaml.min.js
sha384-PeV3bHKEdzcRARo5Kq+9G1/P6AsUVFBfvFBzEBV1RTRAo/2FwZm8+t40U/+mjlfh languages/arduino.min.js
sha384-bwnWq/jjgZRnjrdFYEoqN4a+OW1UlnHML+ajidY201siaDTVnheEGYADE1NJwDyq languages/nsis.min.js
sha384-xtu6FdLbi/zA/rpAJ0vCCxdTgpmm9qGfUA+lC0Aw6nHKHpCSlJmd39XVYtBkLrHe languages/fsharp.min.js
sha384-cXZQ1qYBdbWKWQRs31iX7XDLHE3kg5CgKOHoPIhKjhe6M4KhiN8TPDzlgdkmc5DC languages/coffeescript.min.js
sha384-FQyUTOGq1qrtscA+zjb+AiuD5A556SnyynDeu//fZpig1BCar2XErHC3yTK/p2d/ languages/javascript.min.js
sha384-J0mQCO4LvH09/TuzPwpP8Aa6YH5oopJJsCAaATXmpB8S8uqTZwLN84g6CGmrU+yV languages/livescript.min.js
sha384-JbKnO4Cf/XL9vBUo1m+TwxjuLS7FdcYHE3JqNN0sVgMm06Zvw2EemgF5FDJHl/OQ languages/css.min.js
sha384-BNFJrJC3lJlZ+o3QBELFKOumfNDIHE8XAHNzr6YfvVL2zUGzD5aJUXOOsiIZh2S/ languages/less.min.js
sha384-IbsCslCCSRBkPk5XfOLptlCm/n7VbZvoQ1xhMruWGi+cBUptpZgeLy0w57M64VYt languages/scss.min.js
sha384-e5CN992lzkjf4x50XuOJcm5gZVpTy2htYnNFG403r1G1RhrLko3JFqkOLbdqsbSO languages/stylus.min.js
sha384-QqSfOK9+xzRPKTBnW1TTlZ5Md8YW8BnITxay1Q+I+DE8+UJVJfCDLsAtuVEfqwjv languages/java.min.js
sha384-gEwly+REi6V80S0tuou3j5HVSRIRWCw0BRmGv7Xnr7KAqzHT2XYb34C9RyBWaUtI languages/kotlin.min.js
sha384-HvowE4s2oI+ixRenFzII1HtDcYrJW7PzZmdSdNUssQkX2GIj7qk6I/+xi2v+qHY1 languages/mathematica.min.js
sha384-U+M/V0cMWwfNsxzOC9cr1Zh9dlpqs9lQKUOGOd+WCx6FK2KIWq1WMQ7SHRRnQTuY es/languages/arduino.min.js
sha384-Zi5/Fb2u6Dd0+VZpKenT+Q/r05nyg3Bdl98odolo3v+em+E0AInNDJig/040+69j es/languages/nsis.min.js
sha384-jj+rOd6PrG0cCWkHbjzJhCnf+2rFJE07U9uInPpAF1qdEinoFiPkb5HP6Kn0UGvx es/languages/fsharp.min.js
sha384-CspXR1wsenO/BoAKFYrqLVtd9r+qXFjDtEk4lZDZcN2t8jQZI4uTqUvZA6EkorLE es/languages/coffeescript.min.js
sha384-ks0ujc6B+ynP7omcDIYHyvAemC6qZFRpLcgPYCHy3DoDdw00Ttedd57vabxMpV7r es/languages/javascript.min.js
sha384-1tQiKyDDwT59oX99XyhtbX62lOgZCykP3eGOSKOYsQd7GwtW6+nNu3uIBs3rUjG/ es/languages/livescript.min.js
sha384-7nlMuzuFsdVraL2Lhb8mPAbn50btlyB28sqNnv4DStOLmAt71TbUX9JrCt/Aw8f2 es/languages/less.min.js
sha384-KAorVp5val6fSHkK7lvfNKjTdiSiCVZ3YdkK2/tutxDgI3RfLOYoNFXyQdRQes0P es/languages/css.min.js
sha384-jYEpEvaZ/wLNZfCMIahh1h9hJ1mxFbA8VXsxlrsP3h6vshRg3HQUXD40PFmIpDhx es/languages/scss.min.js
sha384-DcKQkKyJ+TTLvllvdVlRgSR51pr3r0JFNAccXKypCAVOOLMrlcbA0w1WvBEg9oxW es/languages/stylus.min.js
sha384-xnUEFN9P5xfrS+Uco+mgAZ2GpF0jvru7lcrtg6IG5aJTF0h0/ZIuL4SuglQmkE/z es/languages/java.min.js
sha384-LUVmtIf4396aAiguoQAZPRNgPjEstw/YGNamzjMfl+DjKIxoB/y0a3iW6eo22D91 es/languages/kotlin.min.js
sha384-Ke/Uplh9UBtOJYtZ6vFq+jOpX/7rlfKknkNp7afSBKWINhCXWVeN9b0pYfC9gqjG es/languages/mathematica.min.js
sha384-JCZmSWWveRpMOcZ3KrayPpFCxqYZXLIuaa8Q6jcN+u7bWNHr33YMWKtzwKLkxcyX languages/swift.min.js
sha384-0qNf3gOPByrWMSK2/Xt1NZmLaVJCaP+kGJSe9ZGwFIQ1TsuNVFmt0ZeCmAB742Rz languages/typescript.min.js
sha384-VRy1KCJYhgOZ5r3F/9WLpaUoouQHJNWMdPakdNR8m7x4b82cAOBpFg0kX0EdWC1B es/languages/swift.min.js
sha384-TuZ3n5DdQo28ZYb4aAhXF72DEDHSi82Q+Uv73xql+Lr/L98fM7w1ALdLtoPJbmop es/languages/typescript.min.js
```
