<img src="src/logo.png" width="55%" />

- **[arth-steinen-23.ch](https://arth-steinen-23.ch)**

Website für das Tambourenfest *ARTH-STEINEN 2023* in Arth vom 23. - 24. September 2023.

## Zeitplan Enbetten

Um den Zeitplan via `iframe` in eine Website einzubetten, kann der folgende
code verwendet werden:

```html
<iframe id="zeitplan" src="https://arth-steinen-23.ch/#/zeitplan" style="border: 0px; min-height: 400px; height: 680px;" width="100%"></iframe>
<script>
window.addEventListener("message", (event) => {
  if (event.data.startsWith('resize::')) {
    const height = event.data.replace('resize::', '');
    document.getElementById('zeitplan').style.height = `${height}px`;
  }
}, false);
</script>
```
