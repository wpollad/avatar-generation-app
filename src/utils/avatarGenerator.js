export async function createAvatar(callback) {
    const basePath = "/images/";
    const extension = ".svg";

    const headImagePath = `${basePath}head1${extension}`;
    const bodyImagePaths = generatePaths(basePath, "body", 6);
    const hairImagePaths = generatePaths(basePath, "hair", 11);
    const glassesImagePaths = generatePaths(basePath, "glasses", 3);
    const eyesImagePaths = generatePaths(basePath, "eyes", 5);
    const backgroundPaths = generatePaths(basePath, "background", 3);
    const mouthImagePaths = generatePaths(basePath, "mouth", 7);
    const petImagePaths = generatePaths(basePath, "pet", 4);
    const eyebrowImagePaths = generatePaths(basePath, "eyebrow", 6);

    function generatePaths(basePath, name, count) {
        return [...Array(count)].map((_, i) => `${basePath}${name}${i + 1}${extension}`);
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 440;
    canvas.height = 440;

    const imagePromises = [
        loadImage(getRandomPath(backgroundPaths)),
        loadImage(headImagePath),
        loadImage(getRandomPath(bodyImagePaths)),
        loadImage(getRandomPath(hairImagePaths)),
        loadImage(getRandomPath(glassesImagePaths)),
        loadImage(getRandomPath(eyesImagePaths)),
        loadImage(getRandomPath(mouthImagePaths)),
        loadImage(getRandomPath(petImagePaths)),
        loadImage(getRandomPath(eyebrowImagePaths))
    ];
    
    const [backgroundImage, headImage, bodyImage, hairImage, glassesImage, eyesImage, mouthImage, petImage, eyebrowImage] = await Promise.all(imagePromises);

    const items = [
        { image: backgroundImage, x: 0, y: 0, width: canvas.width, height: canvas.height },
        { image: headImage, x: (canvas.width - headImage.width) / 2, y: 125 },
        { image: bodyImage, x: (canvas.width - bodyImage.width) / 2, y: 290 },
        { image: glassesImage, x: (canvas.width - glassesImage.width) / 2, y: 194 },
        { image: eyesImage, x: (canvas.width - eyesImage.width) / 2, y: 200 },
        { image: mouthImage, x: (canvas.width - mouthImage.width) / 2, y: 225 },
        { image: hairImage, x: (canvas.width - hairImage.width) / 2, y: 57 },
        { image: eyebrowImage, x: (canvas.width - eyebrowImage.width) / 2, y: 176 },
        { image: petImage, x: -100, y: 300 }
    ];

    const petRotation = -28;

    items.forEach(({ image, x, y, width = image.width, height = image.height }) => {
        if (image === petImage) {
            context.save();
            context.translate(x + width / 2, y + height / 2);
            context.rotate((petRotation * Math.PI) / 180); 
            context.drawImage(image, -width / 2, -height / 2, width, height); 
            context.restore();
        } else {
            if (image === mouthImage) {
                console.log(width)
            }
            if (image === hairImage && width < 200) {
                context.drawImage(image, x, y + 40, width, height);
            } else if (image === mouthImage && width > 110) {
                context.drawImage(image, x, y - 40, width, height);
            } else {
                context.drawImage(image, x, y, width, height);
            }
        }
    });

    callback(canvas);
}

function getRandomPath(paths) {
    return paths[Math.floor(Math.random() * paths.length)];
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}