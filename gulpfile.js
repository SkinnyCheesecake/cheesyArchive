import { dest, watch, src, series } from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import { glob } from 'glob'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const sass = gulpSass(dartSass)

//Funcion para crear la carpeta que renderiza los archivos .scss
export function css ( done ) {
    src( 'source/scss/app.scss', {sourcemaps: true} )
    .pipe( sass().on('error', sass.logError))
    .pipe( dest( 'build/css' ), {sourcemaps: true})

    done()
}

//Funcion para crear la carpeta que renderiza el app.js
export function js ( done ) {
    src( 'source/js/**/*.js' ).pipe( dest( 'build/js' ) )
    done()
}

// Function para renderizar el archivo de JavaScript y CSS
export function renderFunction () {
    watch( 'source/scss/**/*.scss', css )
    watch( 'source/js/**/*.js', js )

}

export async function crop ( done ) {
    const inputFolder = 'source/imgs/gallery/full'
    const outputFolder = 'source/imgs/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

export async function pictures( done ){
    const srcDir = './source/imgs';
    const buildDir = './build/img';
    const images =  await glob('./source/imgs/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        process(file, outputSubDir);
    });
    done();
}

function process(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

export default series(crop, js, css, pictures, renderFunction)