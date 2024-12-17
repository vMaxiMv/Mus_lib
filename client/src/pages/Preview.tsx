import React from 'react'
import SectionCard from '../components/preview/SectionCard'
import css from '../components/preview/SectionCard.module.css'
const Preview = () => {
    return (
        <div className={css.previewBlock}>
      <SectionCard title="Треки" image="/images/tracks.png" redirectPath="/tracks" />
      <SectionCard title="Жанры" image="/images/genre.png" redirectPath="/genres" />
      <SectionCard title="Плейлисты" image="/images/playlists.jpg" redirectPath="/playlists" />
      <SectionCard title="Музыканты" image="/images/musicians.png" redirectPath="/musicians" />
    </div>
    )
}

export default Preview