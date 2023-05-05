const ResolutionPassed = (votes_for: number, votes_against: number) => {
    return votes_for > votes_against;
}

export default ResolutionPassed;