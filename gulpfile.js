import { dest, watch, src, series } from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import { glob } from 'glob'


const sass = gulpSass(dartSass)

export function css ( done ) {
    src( 'source/scss/app.scss', {sourcemaps: true} )
    .pipe( sass().on('error', sass.logError))
    .pipe( dest( 'build/css' ), {sourcemaps: true})

    done()
}

export function js ( done ) {
    src( 'source/js/app.js' ).pipe( dest( 'build/js' ) )
    done()
}

// Function para renderizar el archivo de JavaScript y CSS
export function renderFunction () {
    watch( 'source/scss/**/*.scss', css )
    watch( 'source/js/**/*.js', js )

}

export default series(js, css, renderFunction)