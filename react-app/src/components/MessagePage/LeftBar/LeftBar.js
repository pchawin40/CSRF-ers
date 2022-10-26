// import css
import "./LeftBar.css"

const test = () => {
    return "this is a test"
}

const LeftBar = () => {
    return (
        <aside id="left-bar-main">
            <section id="section-one">
                <section id="server-name">
                    <h4>Place Holder Name</h4>
                    <button id="new-message-button">New Message</button>
                </section>
            </section>
            <section id = "section-two">
                <section class = "section-two-options">Threads</section>
                <section class = "section-two-options">Direct messages</section>
                <section class = "section-two-options">Mentions & reactions</section>
                <section class = "section-two-options">Drafts & sent</section>
                <section class = "section-two-options">Slack Connect</section>
                <section class = "section-two-options">More</section>
            </section>
            <section id = "section-three">
                <section id="channel-section">
                    <p>Channels</p>
                    <ul>
                        <li>Channel 1</li>
                        <li>Channel 2</li>
                        <li>Channel 3</li>
                    </ul>
                    <section>
                        Browse channels
                    </section>
                </section>
            </section>
            <section id = "section-four">
                <section id="dmr-section">
                    <p>Direct messages</p>
                    <ul>
                        <li>DMR 1</li>
                        <li>DMR 2</li>
                        <li>DMR 3</li>
                    </ul>
                    <section>
                        Add teammates
                    </section>
                </section>
            </section>
        </aside>
    )
}

export default LeftBar
