export default function PlaceImage({place, index=0, className=null}) {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'aspect-square cursor-pointer object-cover lg:h-[410px] w-full';
    }

    return (
        <img
            className={className}
            src={'http://localhost:4000/uploads/' + place.photos[index]}
            alt=""
        />
    );
}