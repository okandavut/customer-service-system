function Service(props) {
return <div>Service {props.value}</div>;
}

export const getStaticProps = async () => {
    return {
        props:{
            value: 1
        }
    }
}

export default Service;
