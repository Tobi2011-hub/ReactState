import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        fullName: 'Alex Morgan',
        bio: 'Curious by nature and passionate about creating thoughtful digital experiences.',
        imgSrc: '/profile-avatar.svg',
        profession: 'Product designer',
      },
      shows: false,
      elapsedSeconds: 0,
    };

    this.mountedAt = null;
    this.intervalId = null;
  }

  componentDidMount() {
    this.mountedAt = Date.now();
    this.intervalId = setInterval(() => {
      this.setState({
        elapsedSeconds: Math.floor((Date.now() - this.mountedAt) / 1000),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  toggleProfile = () => {
    this.setState(({ shows }) => ({ shows: !shows }));
  };

  render() {
    const { person, shows, elapsedSeconds } = this.state;

    return (
      <main className="app-shell">
        <section className="profile-panel" aria-labelledby="page-title">
          <p className="eyebrow">A little introduction</p>
          <h1 id="page-title">Meet the person</h1>
          <p className="intro">
            Get to know the creative behind the work.
          </p>

          <button
            className="profile-toggle"
            type="button"
            onClick={this.toggleProfile}
            aria-expanded={shows}
            aria-controls="person-profile"
          >
            {shows ? 'Hide profile' : 'Show profile'}
          </button>

          {shows && (
            <article className="person-card" id="person-profile">
              <img
                className="person-avatar"
                src={person.imgSrc}
                alt={`${person.fullName} profile`}
              />
              <div className="person-details">
                <p className="person-profession">{person.profession}</p>
                <h2>{person.fullName}</h2>
                <p className="person-bio">{person.bio}</p>
              </div>
            </article>
          )}

          <p className="mount-timer" role="status" aria-live="polite">
            This component has been mounted for{' '}
            <strong>{elapsedSeconds}</strong>{' '}
            {elapsedSeconds === 1 ? 'second' : 'seconds'}.
          </p>
        </section>
      </main>
    );
  }
}

export default App;
