

function onBackgroundChanged(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log(target.value);

  const view = document.getElementById(currentSelectedContainer) as HTMLElement;
  console.log(view);

  if (view) {
    view.style.backgroundColor = target.value;
  }
}

function onCornerRadiusChanged(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log(target.value);

  const view = document.getElementById(currentSelectedContainer) as HTMLElement;
  console.log(view);

  if (view) {
    view.style.borderRadius = `${target.value}px`;
  }
}

function onHeightChanged(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log(target.value);

  const view = document.getElementById(currentSelectedContainer) as HTMLElement;
  console.log(view);

  if (view) {
    view.style.height = `${target.value}px`;
  }
}

function onWidthChanged(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log(target.value);

  const view = document.getElementById(currentSelectedContainer) as HTMLElement;
  console.log(view);

  if (view) {
    view.style.width = `${target.value}px`;
  }
}

function selectBackgroundImage(): void {
  const fileInput = document.getElementById("backgroundImage") as HTMLInputElement;
  const preview = document.getElementById(currentSelectedContainer) as HTMLElement;

  fileInput.addEventListener("change", async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && preview) {
      const imageUrl = URL.createObjectURL(file);
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        preview.style.backgroundRepeat = "no-repeat";
        preview.style.backgroundSize = "cover";
        if (e.target?.result) {
          preview.style.backgroundImage = `url('${e.target.result}')`;
        }
      };

      reader.readAsDataURL(file);
    }
  });

  fileInput.click();
}

function fontSizeChanged(event: Event): void {
  const target = event.target as HTMLInputElement;
 
}