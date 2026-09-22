/**
 * Production Build & Quality Audit Script
 * Runs pre-deployment checks on files, links, assets, and data integrity.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🔍 Starting Pre-Deployment Website Audit...\n');

let errors = [];
let passes = [];

function check(title, fn) {
    try {
        fn();
        passes.push(title);
        console.log(`  ✅ PASS: ${title}`);
    } catch (err) {
        errors.push({ title, message: err.message });
        console.error(`  ❌ FAIL: ${title} -> ${err.message}`);
    }
}

// 1. File Existence Checks
check('Core files exist (index.html, style.css, main.js, profile-data.js, vercel.json)', () => {
    const requiredFiles = [
        'index.html',
        'css/style.css',
        'js/main.js',
        'js/profile-data.js',
        'vercel.json',
        'assets/images/varsha_phukane.jpg',
        'assets/icons/favicon.svg'
    ];
    for (const file of requiredFiles) {
        const fullPath = path.join(__dirname, file);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Missing required file: ${file}`);
        }
    }
});

// 2. JavaScript Syntax Validation
check('JavaScript files have valid syntax without runtime compile errors', () => {
    const jsFiles = ['js/profile-data.js', 'js/main.js'];
    for (const file of jsFiles) {
        const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        try {
            new vm.Script(content);
        } catch (e) {
            throw new Error(`Syntax error in ${file}: ${e.message}`);
        }
    }
});

// 3. Navigation Links & Section ID Integrity
check('All navigation links match existing section IDs in index.html', () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const navHrefRegex = /href="#([a-zA-Z0-9_-]+)"/g;
    let match;
    const requiredIds = [];

    while ((match = navHrefRegex.exec(html)) !== null) {
        if (!requiredIds.includes(match[1])) {
            requiredIds.push(match[1]);
        }
    }

    for (const id of requiredIds) {
        const idRegex = new RegExp(`id="${id}"`, 'i');
        if (!idRegex.test(html)) {
            throw new Error(`Navigation points to #${id}, but no element with id="${id}" was found.`);
        }
    }
});

// 4. Meta and SEO Checks
check('Page has title, meta description, favicon, and canonical URL declared', () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    if (!/<title>[\s\S]*?Varsha Phukane[\s\S]*?<\/title>/i.test(html)) {
        throw new Error('Missing or incorrect <title> with Varsha Phukane');
    }
    if (!/<meta name="description"/i.test(html)) {
        throw new Error('Missing meta description');
    }
    if (!/rel="icon"/i.test(html)) {
        throw new Error('Missing favicon link');
    }
    if (!/<link\s+rel="canonical"\s+href="https:\/\/principal-portfolio-indol\.vercel\.app\/"/i.test(html)) {
        throw new Error('Missing or incorrect canonical URL (must be https://principal-portfolio-indol.vercel.app/)');
    }
    if (!/<meta\s+property="og:url"\s+content="https:\/\/principal-portfolio-indol\.vercel\.app\/"/i.test(html)) {
        throw new Error('Missing or incorrect og:url meta tag');
    }
    if (!/<section\s+id="hero"/i.test(html)) {
        throw new Error('Missing #hero section anchor');
    }
    if (/utm_source=chatgpt\.com/i.test(html)) {
        throw new Error('Found unwanted utm_source=chatgpt.com in index.html');
    }
});

// 5. Config Data Integrity
check('Data store has all 10 sections populated with Varsha Phukane', () => {
    const data = require('./js/profile-data.js');
    if (!data) throw new Error('PRINCIPAL_DATA is not defined in profile-data.js');
    if (data.identity.name !== 'Varsha Phukane') throw new Error(`Expected Varsha Phukane, got ${data.identity.name}`);
    if (!data.beyondTitle || !data.journey || !data.philosophy || !data.impact || !data.initiatives || !data.lifeAtSchool || !data.beyondSchool || !data.thoughts || !data.signature) {
        throw new Error('One or more required sections missing in PRINCIPAL_DATA');
    }
});

console.log('\n==========================================');
console.log(`Audit Completed: ${passes.length} Passed, ${errors.length} Failed.`);
console.log('==========================================\n');

if (errors.length > 0) {
    process.exit(1);
} else {
    console.log('🚀 Website is 100% verified and production-ready for deployment!\n');
}
