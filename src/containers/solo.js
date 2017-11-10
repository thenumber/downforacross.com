import './css/solo.css';
import Room from './room';
import { db } from '../actions';
import { makeGame } from '../gameUtils';
import { lazy } from '../jsUtils';
import me from '../localAuth';

export default class Solo extends Room {

  componentDidMount() {
    this.color = 'rgb(118, 226, 118)';
    this.id = 1;
    this.pid = parseInt(this.props.match.params.pid, 10);
    this.loadGame(game => {
      this.setState({
        loaded: true,
        game: game,
      });
    }, () => {
      db.ref('puzzle/' + this.pid).on('value', puzzle => {
        if (!this.state.loaded) {
          const game = makeGame(-1, '', puzzle.val());
          this.setState({
            loaded: true,
            game: game
          });
        } else {
          // TODO play while puzzle is being edited?
        }
      });
    });
  }

  componentWillUnmount() {
    db.ref('puzzle/' + this.pid).off();
  }

  loadGame(success, fail) {
    const id = me();

    // this is such a hack
    if (id !== 'public') {
      db.ref('solo/' + id).once('value', game => {
        game = game.val();
        if (game && game.pid === this.pid) {
          success(game);
        } else {
          fail();
        }
      });
    } else {
      fail();
    }
  }

  saveGame(game) {
    const id = me();
    if (id !== 'public') {
      db.ref('solo/' + id).set(game);
    }
  }

  transaction(fn, cbk) {
    this.setState({
      game: fn(this.state.game)
    }, () => {
      lazy('saveGame', () => {
        this.saveGame(this.state.game);
      });
      if (cbk) cbk();
    });
  }

  cellTransaction(r, c, fn, cbk) {
    this.transaction(game => {
      if (game && game.grid && game.grid[r] && game.grid[r][c]) {
        game.grid[r][c] = fn(game.grid[r][c]);
      }
      return game;
    }, cbk);
  }

  shouldRenderChat() { // solo games don't have chat
    return false;
  }
};
