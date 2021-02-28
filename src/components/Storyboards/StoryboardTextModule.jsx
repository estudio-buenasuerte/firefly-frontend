import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import cx from 'classnames';

const StoryboardTextModule = ({ title, description, index }) => (
	<section
		className={cx('storyboard__section storyboard__section--text', {
			'border-top': index > 0,
		})}>
		<p className='storyboard__section-title'>{title}</p>
		{description && (
			<div className='storyboard__section-description'>
				<BlockContent blocks={description} />
			</div>
		)}
	</section>
);

export default StoryboardTextModule;
