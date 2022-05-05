import React, {Component} from 'react';
import _ from 'lodash';
import Flex from 'react-flexview';
import {MdRadioButtonUnchecked, MdCheckCircle} from 'react-icons/md';
import {GiCrossedSwords} from 'react-icons/gi';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {isSimpleView} from '../../lib/isSimpleView';

export interface EntryProps {
  info: {
    type: string;
  };
  title: string;
  author: string;
  pid: string;
  status: 'started' | 'solved' | undefined;
  stats: {
    numSolves?: number;
    solves?: Array<any>;
  };
  fencing?: boolean;
}

class Entry extends Component<RouteComponentProps & EntryProps> {
  handleClick = () => {
    /*
    this.setState({
      expanded: !this.state.expanded,
    });
    this.props.onPlay(this.props.pid);
    */
  };

  handleMouseLeave = () => {};

  get size() {
    const {type} = this.props.info;
    if (type === 'Daily Puzzle') {
      return 'Standard';
    }
    if (type === 'Mini Puzzle') {
      return 'Mini';
    }
    return 'Puzzle'; // shouldn't get here???
  }

  render() {
    const {title, author, pid, status, stats, fencing} = this.props;
    const numSolvesOld = _.size(stats?.solves || []);
    const numSolves = numSolvesOld + (stats?.numSolves || 0);
    const displayName = _.compact([author.trim(), this.size]).join(' | ');
    return (
      <div
        onKeyUp={() => {}}
        role="button"
        style={{textDecoration: 'none', color: 'initial'}}
        onClick={() => {
          const path = `/beta/play/${pid}${fencing ? '?fencing=1' : ''}`;
          const isSimple = isSimpleView(this.props.location);
          const origin = window.location.origin;
          if (isSimple) {
            // eslint-disable-next-line
            parent?.postMessage(
              {appId: 'crossword', addPanel: {url: origin + path, title: `Crossword: ${title}`}},
              '*'
            );
          } else {
            this.props.history.push(path);
          }
        }}
        tabIndex={0}
      >
        <Flex className="entry" column onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>
          <Flex className="entry--top--left">
            <Flex grow={0}>
              <p
                style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                title={displayName}
              >
                {displayName}
              </p>
            </Flex>
            <Flex>
              {status === 'started' && <MdRadioButtonUnchecked className="entry--icon" />}
              {status === 'solved' && <MdCheckCircle className="entry--icon" />}
              {status !== 'started' && status !== 'solved' && fencing && (
                <GiCrossedSwords className="entry--icon fencing" />
              )}
            </Flex>
          </Flex>
          <Flex className="entry--main">
            <Flex grow={0}>
              <p style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} title={title}>
                {title}
              </p>
            </Flex>
          </Flex>
          <Flex className="entry--details">
            <p>
              Solved {numSolves} {numSolves === 1 ? 'time' : 'times'}
            </p>
          </Flex>
        </Flex>
      </div>
    );
  }
}

export default withRouter(Entry);
