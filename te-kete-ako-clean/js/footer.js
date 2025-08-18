
function generateFooter() {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-section footer-brand">
                    <h3>Te Kete Ako</h3>
                    <p class="footer-description">A collection of world-class, non-commercial educational resources for Mangakōtukutuku College, built on a foundation of vertical depth, profound ideas, and cultural connection.</p>
                    <div class="cultural-quote">
                        <p class="cultural-quote-text">"Mō tātou, ā, mō kā uri ā muri ake nei."</p>
                        <p class="cultural-quote-translation">"For us and our children after us."</p>
                    </div>
                </div>
                <div class="footer-section footer-resources">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="unit-plans.html">Unit Plans</a></li>
                        <li><a href="lessons.html">Lesson Plans</a></li>
                        <li><a href="handouts.html">Handouts</a></li>
                        <li><a href="games.html">Games & Activities</a></li>
                        <li><a href="ai-hub.html">AI Hub</a></li>
                    </ul>
                </div>
                <div class="footer-section footer-support">
                    <h3>Support & Connect</h3>
                    <ul>
                        <li><a href="teacher-guide.html">Teacher Guide</a></li>
                        <li><a href="https://github.com/Tobillicious/te-kete-ako-clean" target="_blank">GitHub Project</a></li>
                        <li><a href="mailto:contact@teketeako.io">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-section footer-cultural">
                    <h3>External Links</h3>
                    <ul>
                        <li><a href="https://tewhanake.maori.nz/" target="_blank">Te Whanake</a></li>
                        <li><a href="https://tereomaori.tki.org.nz/" target="_blank">Te Reo Māori (TKI)</a></li>
                        <li><a href="https://tahurangi.education.govt.nz/" target="_blank">Tāhūrangi</a></li>
                        <li><a href="https://www.tepapa.govt.nz/learn/for-educators" target="_blank">Te Papa Tongarewa</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="footer-copyright">&copy; 2025 Te Kete Ako. He waka eke noa.</p>
                <div class="footer-social">
                    <a href="#" class="social-link" aria-label="Facebook">F</a>
                    <a href="#" class="social-link" aria-label="Twitter">T</a>
                </div>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

document.addEventListener('DOMContentLoaded', generateFooter);

